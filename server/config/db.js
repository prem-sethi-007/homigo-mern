const dns = require('dns');
const mongoose = require('mongoose');

const FALLBACK_DNS = ['1.1.1.1', '8.8.8.8'];

// mongodb+srv:// URIs need an SRV DNS lookup. Some environments (local DNS
// proxies, VPNs, certain routers/ISPs) hand Node a resolver that refuses SRV
// queries, which surfaces as "querySrv ECONNREFUSED". When that happens we
// switch Node's resolver to public DNS and retry. Set DNS_SERVERS
// (comma-separated) in .env to choose the resolvers yourself.
function isSrvDnsError(err) {
  const msg = String(err && err.message);
  return (
    /querySrv|queryTxt/i.test(msg) &&
    /ECONNREFUSED|ETIMEOUT|ENOTFOUND|ESERVFAIL|EREFUSED/i.test(msg)
  );
}

function useDnsServers(servers) {
  dns.setServers(servers);
  console.warn(`Using DNS servers for Atlas lookup: ${servers.join(', ')}`);
}

function connect(uri) {
  return mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
}

// Connects mongoose to MONGO_URI. Throws on failure so each caller (server,
// seed script, test script) decides how to exit.
async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined in .env');
  }

  const customDns = (process.env.DNS_SERVERS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (customDns.length) useDnsServers(customDns);

  try {
    await connect(uri);
  } catch (err) {
    const canRetry =
      uri.startsWith('mongodb+srv://') && !customDns.length && isSrvDnsError(err);
    if (!canRetry) throw err;

    console.warn(`SRV lookup failed (${err.message}); retrying with public DNS`);
    useDnsServers(FALLBACK_DNS);
    await connect(uri);
  }

  console.log(`MongoDB connected (db: ${mongoose.connection.name})`);
  return mongoose.connection;
}

module.exports = connectDB;
