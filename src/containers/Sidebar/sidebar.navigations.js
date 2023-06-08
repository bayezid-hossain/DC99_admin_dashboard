import {
  SidebarEmailIcon,
  SidebarChatIcon,
  SidebarEcommerceIcon,
  SidebarMapsIcon,
  SidebarProfileIcon,
  SidebarScrumBoardIcon,
  SidebarInvoiceIcon,
  SidebarCalendarIcon,
  SidebarNotesIcon,
  SidebarToDosIcon,
  SidebarFireStoreIcon,
  SidebarContactsIcon,
  SidebarShuffleIcon,
  SidebarChartsIcon,
  SidebarFormsIcon,
  SidebarUIIcon,
  SidebarAdvancedIcon,
  SidebarFeedbackIcon,
  SidebarTablesIcon,
  SidebarPagesIcon,
  SidebarGithubIcon,
  SidebarBlankIcon,
} from '@iso/config/icon.config';

export default [
  {
    key: 'product',
    label: 'Products',
    leftIcon: <SidebarEcommerceIcon size={19} />,
    children: [
      {
        key: 'products',
        label: 'All Products',
      },
      {
        key: 'products/new',
        label: 'Create New Product',
      },
    ],
  },
  {
    key: 'category',
    label: 'Category',
    leftIcon: <SidebarShuffleIcon size={19} />,
    children: [
      {
        key: 'categories',
        label: 'All Categories',
      },
      {
        key: 'categories/new',
        label: 'Create New Category',
      },
    ],
  },
  {
    key: 'my_profile',
    label: 'sidebar.profile',
    leftIcon: <SidebarProfileIcon size={19} />,
  },

  {
    key: 'calendar',
    label: 'sidebar.calendar',
    leftIcon: <SidebarCalendarIcon size={19} />,
  },
  {
    key: 'notes',
    label: 'sidebar.notes',
    leftIcon: <SidebarNotesIcon size={19} />,
  },
  {
    key: 'todo',
    label: 'sidebar.todos',
    leftIcon: <SidebarToDosIcon size={19} />,
  },

  {
    key: 'contacts',
    label: 'sidebar.contacts',
    leftIcon: <SidebarContactsIcon size={19} />,
  },
  {
    key: 'shuffle',
    label: 'sidebar.shuffle',
    leftIcon: <SidebarShuffleIcon size={19} />,
  },
];
