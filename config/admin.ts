export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '38f54aec1d2335d2c1cc36c9ea498c5a38667f503879488af3e9c4c58e4ecdd1ef2cbf668bd6b290b155f60ced0004a19e7e2f058b80a63594209449791ec85f'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'c92d7e319b94603d5292e2f86f8e7f6ff8643ce9b3c7510318a68af45be76d72ff841c4973414690fd9a1d1f7d436fae9a3b9103a3774066551fbcbe0465a4e8'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'cb54c46fa1c85d9741b118287179a1b932d724db19389a7eca31c0ecdc8af87ad8180cd8e43bb34ee377da7fb27138a9e67d7351a0c211c17e81dabec7a99084'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
