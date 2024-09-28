export const menuItems = [
  {
    id: 1,
    label: "menuitems.menu.text",
    isTitle: true
  },
  {
    id: 2,
    label: "menuitems.dashboard.text",
    icon: "uil-home-alt",
    badge: {
      variant: "primary",
      text: "menuitems.dashboard.badge"
    },
    link: "/"
  },
  {
    id: 25,
    label: "menuitems.pages.text",
    isTitle: true
  },
  {
    id: 26,
    label: "menuitems.authentication.text",
    icon: "uil-user-circle",
    subItems: [
      {
        id: 27,
        label: "menuitems.authentication.list.login",
        link: "/auth/login-1",
        parentId: 26
      },
      {
        id: 28,
        label: "menuitems.authentication.list.register",
        link: "/auth/register-1",
        parentId: 26
      },
      {
        id: 29,
        label: "menuitems.authentication.list.recoverpwd",
        link: "/auth/recoverpwd",
        parentId: 26
      },
      {
        id: 30,
        label: "menuitems.authentication.list.lockscreen",
        link: "/auth/lock-screen",
        parentId: 26
      }
    ]
  },
  {
    id: 31,
    label: "menuitems.utility.text",
    icon: "uil-file-alt",
    subItems: [
      {
        id: 32,
        label: "menuitems.utility.list.starter",
        link: "/utility/starter",
        parentId: 31
      },
      {
        id: 33,
        label: "menuitems.utility.list.maintenance",
        link: "/utility/maintenance",
        parentId: 31
      },
      {
        id: 35,
        label: "menuitems.utility.list.comingsoon",
        link: "/utility/comingsoon",
        parentId: 31
      },
    ]
  },
  {
    id: 88,
    label: "menuitems.multilevel.text",
    icon: "uil-share-alt",
    subItems: [
      {
        id: 89,
        label: "menuitems.multilevel.list.level1.1",
        link: "javascript: void(0);",
        parentId: 88
      },
      {
        id: 90,
        label: "menuitems.multilevel.list.level1.2",
        parentId: 88,
        subItems: [
          {
            id: 91,
            label: "menuitems.multilevel.list.level1.level2.1",
            link: "javascript: void(0);",
            parentId: 88
          },
          {
            id: 92,
            label: "menuitems.multilevel.list.level1.level2.2",
            link: "javascript: void(0);",
            parentId: 88
          }
        ]
      }
    ]
  }
];

export const horizontalMenu = [
  {
    id: 1,
    label: "menuitems.dashboard.text",
    icon: "uil-home-alt",
    link: "/"
  },
  {
    id: 71,
    label: "menuitems.pages.text",
    icon: "uil-copy",
    subItems: [
      {
        id: 72,
        label: "menuitems.authentication.text",
        subItems: [
          {
            id: 73,
            label: "menuitems.authentication.list.login",
            link: "/auth/login-1"
          },
          {
            id: 74,
            label: "menuitems.authentication.list.register",
            link: "/auth/register-1"
          },
          {
            id: 75,
            label: "menuitems.authentication.list.recoverpwd",
            link: "/auth/recoverpwd"
          },
          {
            id: 76,
            label: "menuitems.authentication.list.lockscreen",
            link: "/auth/lock-screen"
          }
        ]
      },
      {
        id: 77,
        label: "menuitems.utility.text",
        subItems: [
          {
            id: 78,
            label: "menuitems.utility.list.starter",
            link: "/utility/starter"
          },
          {
            id: 79,
            label: "menuitems.utility.list.maintenance",
            link: "/utility/maintenance"
          },
          {
            id: 80,
            label: "menuitems.utility.list.comingsoon",
            link: "/utility/comingsoon"
          },
        ]
      }
    ]
  }
];
