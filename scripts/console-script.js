const sampleTags = [
  { name: 'Web Development' },
  { name: 'React' },
  { name: 'JavaScript' },
  { name: 'TypeScript' },
  { name: 'Tutorial' },
  { name: 'Portfolio' },
  { name: 'UI/UX' },
];

const sampleBlogPosts = [
  {
    title: 'Membangun Portfolio Website dengan React dan Tailwind CSS',
    content: `
      <h2>Pendahuluan</h2>
      <p>Portfolio website adalah cara yang efektif untuk memamerkan karya dan kemampuan Anda sebagai developer. Dalam tutorial ini, kita akan membahas cara membuat portfolio website yang modern menggunakan React dan Tailwind CSS.</p>
      
      <h2>Persiapan Proyek</h2>
      <p>Pertama, mari buat proyek React baru dengan Vite:</p>
      <pre><code>npm create vite@latest portfolio-website -- --template react-ts</code></pre>
      
      <h2>Instalasi Tailwind CSS</h2>
      <p>Setelah proyek dibuat, kita perlu menginstal dan mengkonfigurasi Tailwind CSS:</p>
      <pre><code>npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p</code></pre>
      
      <h2>Struktur Komponen</h2>
      <p>Kita akan membuat beberapa komponen utama seperti Header, Hero Section, Projects, dan Contact Form.</p>
    `,
    tags: ['Web Development', 'React', 'Portfolio', 'UI/UX'],
  },
  {
    title: 'Panduan Lengkap TypeScript untuk Pemula',
    content: `
      <h2>Apa itu TypeScript?</h2>
      <p>TypeScript adalah superset dari JavaScript yang menambahkan fitur static typing. Ini membantu developer menulis kode yang lebih aman dan mudah dipelihara.</p>
      
      <h2>Keuntungan Menggunakan TypeScript</h2>
      <p>Beberapa keuntungan utama menggunakan TypeScript:</p>
      <ul>
        <li>Deteksi error lebih awal</li>
        <li>Autocomplete yang lebih baik</li>
        <li>Dokumentasi kode yang lebih jelas</li>
        <li>Refactoring yang lebih aman</li>
      </ul>
      
      <h2>Memulai dengan TypeScript</h2>
      <p>Mari kita lihat contoh dasar penggunaan TypeScript:</p>
      <pre><code>interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = {
  name: "John Doe",
  age: 30,
  email: "john@example.com"
};</code></pre>
    `,
    tags: ['TypeScript', 'Tutorial', 'JavaScript'],
  },
  {
    title: 'Membuat Aplikasi Web Modern dengan Next.js',
    content: `
      <h2>Kenapa Next.js?</h2>
      <p>Next.js adalah framework React yang menyediakan fitur-fitur modern seperti Server-Side Rendering, Static Site Generation, dan API Routes.</p>
      
      <h2>Memulai Proyek</h2>
      <p>Buat proyek Next.js baru dengan perintah berikut:</p>
      <pre><code>npx create-next-app@latest my-app</code></pre>
      
      <h2>Fitur Utama</h2>
      <p>Beberapa fitur utama Next.js yang akan kita pelajari:</p>
      <ul>
        <li>Routing otomatis</li>
        <li>Optimasi gambar</li>
        <li>API Routes</li>
        <li>Static Site Generation</li>
      </ul>
      
      <h2>Deployment</h2>
      <p>Next.js dapat dengan mudah di-deploy ke berbagai platform seperti Vercel, Netlify, atau server pribadi.</p>
    `,
    tags: ['Web Development', 'React', 'Tutorial'],
  },
  {
    title: 'Tips dan Trik JavaScript Modern',
    content: `
      <h2>ES6+ Features</h2>
      <p>JavaScript modern memiliki banyak fitur yang membuat kode lebih ringkas dan mudah dibaca:</p>
      
      <h3>Destructuring</h3>
      <pre><code>const { name, age } = user;</code></pre>
      
      <h3>Spread Operator</h3>
      <pre><code>const newArray = [...oldArray, newItem];</code></pre>
      
      <h3>Arrow Functions</h3>
      <pre><code>const add = (a, b) => a + b;</code></pre>
      
      <h2>Async/Await</h2>
      <p>Cara modern untuk menangani operasi asynchronous:</p>
      <pre><code>async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}</code></pre>
    `,
    tags: ['JavaScript', 'Tutorial'],
  }
];

async function populateSampleData() {
  try {
    // Create tags
    const createdTags = await Promise.all(
      sampleTags.map(async (tag) => {
        const existingTag = await strapi.db.query('api::tag.tag').findOne({
          where: { name: tag.name },
        });
        
        if (!existingTag) {
          return strapi.db.query('api::tag.tag').create({
            data: tag,
          });
        }
        return existingTag;
      })
    );

    // Create blog posts
    await Promise.all(
      sampleBlogPosts.map(async (post) => {
        const existingPost = await strapi.db.query('api::blog-post.blog-post').findOne({
          where: { title: post.title },
        });

        if (!existingPost) {
          const tagIds = createdTags
            .filter((tag) => post.tags.includes(tag.name))
            .map((tag) => tag.id);

          return strapi.db.query('api::blog-post.blog-post').create({
            data: {
              ...post,
              tags: tagIds,
              publishedAt: new Date(),
            },
          });
        }
        return existingPost;
      })
    );

    console.log('Sample data has been populated successfully!');
  } catch (error) {
    console.error('Error populating sample data:', error);
  }
}

// Execute the function
populateSampleData(); 