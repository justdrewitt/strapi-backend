# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>

# Strapi Portfolio API

Strapi backend untuk aplikasi portfolio.

## Mengatur Izin API (Penting!)

Setelah menjalankan server, Anda perlu mengatur izin akses API agar frontend dapat mengakses data:

1. Buka Admin UI di http://localhost:1337/admin
2. Login dengan kredensial admin Anda
3. Pergi ke Settings → USERS & PERMISSIONS PLUGIN → Roles
4. Klik pada "Public" role
5. Di bagian Permissions, cari "Blog-post" dan "Tag"
6. Centang kotak untuk "find" dan "findOne" pada keduanya
7. Klik tombol "Save" di kanan atas

Tanpa langkah ini, frontend akan mendapatkan error 403 Forbidden saat mencoba mengakses API.

## Mengisi Sample Data

Untuk mengisi database dengan sample data:

1. Pastikan server Strapi berjalan
2. Buka terminal dan masuk ke direktori strapi
3. Jalankan: `npx strapi console`
4. Di console, jalankan: `.load scripts/populate-sample-data.js`

## Pengembangan

```bash
# Install dependencies
npm install

# Menjalankan server dalam mode development
npm run develop

# Build untuk production
npm run build

# Menjalankan server dalam mode production
npm run start
```

## Dokumentasi API

Setelah menjalankan server, Anda dapat mengakses:

- Admin UI: http://localhost:1337/admin
- API Dokumentasi: http://localhost:1337/documentation
