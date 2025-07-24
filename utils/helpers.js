function env(field) {
  return process.env[field] || null;
}

export { env };
