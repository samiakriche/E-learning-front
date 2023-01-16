import { Suspense, lazy, useContext, useState, useEffect } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';

// guards
// import GuestGuard from '../guards/GuestGuard';
// import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';

// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  // const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    window.location.reload();
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, []);

  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element:
            // <GuestGuard>
            !user ? <Login /> : <Navigate to="/" />,
          // </GuestGuard>
        },
        {
          path: 'register',
          element:
            // <GuestGuard>
            !user ? <Register /> : <Navigate to="/" />,
          // </GuestGuard>
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
        { path: 'choice', element: <ChoicePage /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        // <AuthGuard>
        user ? <DashboardLayout /> : <Navigate to="/auth/login" />
        // </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        { path: 'banking', element: <GeneralBanking /> },
        { path: 'booking', element: <GeneralBooking /> },
        {
          path: 'e-learning',
          children: [
            { element: <Navigate to="/dashboard/e-learning/lists" replace />, index: true },
            { path: 'lists', element: <ListCourses /> },
            { path: 'add', element: <AddCourse /> },
            { path: 'update/:name', element: <UpdateCourse /> },
            { path: 'listsArtist', element: <ListCourseArtist /> },
            { path: 'addmodule', element: <AddModule /> },
            { path: 'listmoduleartist', element: <ListModuleArtist /> },
            { path: 'coursecontent', element: <CourseContent /> },
            { path: 'coursedetails', element: <CourseDetaile /> },
            { path: 'coursecontentuser', element: <CourseContentUser /> },
            { path: 'video/:id', element: <Meetings /> },
            { path: 'video-user/:id', element: <MeetingsUser /> },
            { path: 'scrapingcourses', element: <Scrapingcourses /> },


            { path: 'join', element: < Join /> },



            /* QUIZ */

            { path: 'quiz/add', element: <AddQuiz /> },
            { path: 'quiz/update/:name', element: <UpdateQuiz /> },
            { path: 'quiz/list', element: <ListQuiz /> },
            /* Questions */
            { path: 'question/add', element: <AddQuestion /> },
            { path: 'question/update/:name', element: <UpdateQuestion /> },
            { path: 'question/add/reload', element: <UselessPage /> },
            { path: 'question/list', element: <ListQuestion /> },
            /* Wishlist */
            { path: 'wishlist', element: <WishList /> },
            /* Subscriptions */
            { path: 'subscriptions', element: <Subscriptions /> },
            /* respond to quiz */
            { path: 'respondToQuiz', element: <QuizResponse /> },
            /**  Analytics */
            { path: 'analytics', element: <ElearningAnalytics /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new-post', element: <BlogNewPost /> },
          ],
        },

        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <Chat />, index: true },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> },
          ],
        },
        { path: 'calendar', element: <Calendar /> },
        { path: 'kanban', element: <Kanban /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));
const ChoicePage = Loadable(lazy(() => import('../pages/auth/ChoicePage')));


// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));


// Learning
const ListCourses = Loadable(lazy(() => import('../pages/E-learning/ListCourses')));
const ListCourseArtist = Loadable(lazy(() => import('../pages/E-learning/ListCourseArtist')));

const AddCourse = Loadable(lazy(() => import('../pages/E-learning/AddCourse')));
const CourseContent = Loadable(lazy(() => import('../pages/E-learning/CourseContent')));
const UpdateCourse = Loadable(lazy(() => import('../pages/E-learning/UpdateCourse')));
const AddModule = Loadable(lazy(() => import('../pages/E-learning/AddModule')));
const ListModuleArtist = Loadable(lazy(() => import('../pages/E-learning/ListModuleArtist')));
const CourseDetaile = Loadable(lazy(() => import('../pages/E-learning/CourseDetaile')));
const CourseContentUser = Loadable(lazy(() => import('../pages/E-learning/CourseContentUser')));
const Meetings = Loadable(lazy(() => import('../pages/E-learning/meeting')));
const MeetingsUser = Loadable(lazy(() => import('../pages/E-learning/meetinguser')));
const Scrapingcourses = Loadable(lazy(() => import('../pages/E-learning/Scrapingcourses')));



const Join = Loadable(lazy(() => import('../pages/E-learning/join')));





const AddQuiz = Loadable(lazy(() => import('../pages/E-learning/quiz/AddQuiz')));
const UpdateQuiz = Loadable(lazy(() => import('../pages/E-learning/quiz/UpdateQuiz')));
const ListQuiz = Loadable(lazy(() => import('../pages/E-learning/quiz/ListQuiz')));
const AddQuestion = Loadable(lazy(() => import('../pages/E-learning/question/addQuestion')));
const UpdateQuestion = Loadable(lazy(() => import('../pages/E-learning/question/updateQuestion')));
const ListQuestion = Loadable(lazy(() => import('../pages/E-learning/question/listQuestion')));
const UselessPage = Loadable(lazy(() => import('../pages/E-learning/question/uselessPage')));
const WishList = Loadable(lazy(() => import('../pages/E-learning/wishList/wishlist')));
const Subscriptions = Loadable(lazy(() => import('../pages/E-learning/subscription/subscriptions')));
const QuizResponse = Loadable(lazy(() => import('../pages/E-learning/response/listQuestionResponse')));

const ElearningAnalytics = Loadable(lazy(() => import('../pages/E-learning/statistics/ElearningAnalytics')));


const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));
const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
const Kanban = Loadable(lazy(() => import('../pages/dashboard/Kanban')));
// Main
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

