module.exports = {
  title: "BluePencil",
  description: "好记性不如一只烂笔头",
  dest: "dist/",
  themeConfig: {
    logo: "/icon-folder.png",
    nav: [
      { text: "首页", link: "/" },
      { text: "前端", link: "/frontend/" },
      { text: "后端", link: "/backend/" },
      { text: "读书笔记", link: "/note/" },
      { text: "优质资源", link: "/resource/" },
      { text: "Github", link: "https://github.com/chuilee" },
    ],
    sidebar: {
      "/backend/": [
        {
          title: "后端技术",
          collapsable: false,
          children: ["", "nodejs", "mysql"],
        },
      ],
      "/frontend/": [
        {
          title: "前端技术",
          collapsable: false,
          children: ["", "typescript", "vue", "wechat"],
        },
      ],
      "/note/": [
        {
          title: "读书笔记",
          collapsable: false,
          children: ["", "http2"],
        },
      ],
      "/resource/": [
        {
          title: "优质资源",
          collapsable: false,
          children: [""],
        },
      ],
    },
    displayAllHeaders: true,
  },
};
