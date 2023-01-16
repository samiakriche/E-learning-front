// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  choice: path(ROOTS_AUTH, '/choice'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking')
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all')
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },

  
  eLearning: {
    root: path(ROOTS_DASHBOARD, '/e-learning'),
    lists: path(ROOTS_DASHBOARD, '/e-learning/lists'),
    add: path(ROOTS_DASHBOARD, '/e-learning/add'),
    coursecontent: path(ROOTS_DASHBOARD, '/e-learning/coursecontent'),
    update_course: path(ROOTS_DASHBOARD, '/e-learning/update/:name'),
    listsArtist: path(ROOTS_DASHBOARD, '/e-learning/listsArtist'),
    addmodule: path(ROOTS_DASHBOARD, '/e-learning/addmodule'),
    listmoduleartist: path(ROOTS_DASHBOARD, '/e-learning/listmoduleartist'),
    coursedetaile: path(ROOTS_DASHBOARD, '/e-learning/coursedetails'),
    coursecontentuser: path(ROOTS_DASHBOARD, '/e-learning/coursecontentuser'),
    Meetings : path(ROOTS_DASHBOARD, '/e-learning/meeting/:id'),
    Scrapingcourses: path(ROOTS_DASHBOARD, '/e-learning/Scrapingcourses'),

    addQuiz :  path(ROOTS_DASHBOARD, '/e-learning/quiz/add') ,
    updateQuiz :  path(ROOTS_DASHBOARD, '/e-learning/quiz/update/:name') ,
    listQuiz :  path(ROOTS_DASHBOARD, '/e-learning/quiz/list') ,
    addQuestion :  path(ROOTS_DASHBOARD, '/e-learning/question/add') ,
    updateQuestion :  path(ROOTS_DASHBOARD, '/e-learning/question/update/:name') ,
    listQuestion :  path(ROOTS_DASHBOARD, '/e-learning/question/list') ,
    wishlist :  path(ROOTS_DASHBOARD, '/e-learning/wishlist') ,
    subscriptions :  path(ROOTS_DASHBOARD, '/e-learning/subscriptions') ,
    addQuestionReload :  path(ROOTS_DASHBOARD, '/e-learning/question/add/reload') ,
    respondToQuiz :  path(ROOTS_DASHBOARD, '/e-learning/respondToQuiz'),
    analytics :  path(ROOTS_DASHBOARD, '/e-learning/analytics'),
   





  },


  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
