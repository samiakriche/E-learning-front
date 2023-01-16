// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
  music: getIcon('ic_music'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard }, 
      { title: 'E-learning Analytics', path: PATH_DASHBOARD.eLearning.analytics, icon: ICONS.analytics }, 
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // MANAGEMENT : USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'profile', path: PATH_DASHBOARD.user.profile }, 
          { title: 'create', path: PATH_DASHBOARD.user.newUser },
          { title: 'edit', path: PATH_DASHBOARD.user.editById },
          { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },
      // MANAGEMENT : E-Learnng
      {
        title: 'E-Learning',
        path: PATH_DASHBOARD.eLearning.root,
        icon: ICONS.calendar,
        children: [
          { title: 'List Courses', path: PATH_DASHBOARD.eLearning.lists },
          { title: 'Add Course', path: PATH_DASHBOARD.eLearning.add },
          { title: 'Artist Course', path: PATH_DASHBOARD.eLearning.listsArtist },
          { title: 'Quiz List', path: PATH_DASHBOARD.eLearning.listQuiz },
          { title: 'My wishList', path: PATH_DASHBOARD.eLearning.wishlist },
          { title: 'My Subscriptions', path: PATH_DASHBOARD.eLearning.subscriptions },

        ],
      }, 
     
    ],
  },
 


];

export default navConfig;
