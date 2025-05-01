'use strict';

module.exports = (plugin) => {
  // Mengatur izin dasar pada startup aplikasi
  plugin.bootstrap = async (strapi) => {
    // Mendapatkan role 'Public'
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      // Mendapatkan service untuk memanage izin
      const usersPermissionsService = strapi.plugin('users-permissions').service('role');

      // Tambahkan izin untuk 'find' dan 'findOne' ke blog-post dan tag
      const apiPermissions = {
        'api::blog-post.blog-post': ['find', 'findOne'],
        'api::tag.tag': ['find', 'findOne'],
      };

      // Mendapatkan permissions saat ini
      const currentPermissions = await usersPermissionsService.findUIPermissions();
      
      // Mengatur izin akses untuk API
      for (const controller in apiPermissions) {
        const actions = apiPermissions[controller];
        for (const action of actions) {
          // Cari permission yang sudah ada untuk controller dan action
          const permission = currentPermissions.find(
            p => p.action === `${controller}.${action}` && p.subject === null
          );
          
          if (permission) {
            // Aktifkan permission jika ditemukan
            await strapi.query('plugin::users-permissions.permission').update({
              where: { id: permission.id },
              data: { enabled: true },
            });
          }
        }
      }
      
      console.log('Public API permissions have been configured');
    }
  };

  return plugin;
}; 