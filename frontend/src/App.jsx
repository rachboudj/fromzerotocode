import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


// Composant
import Menu from './components/Menu';

// Page
import Home from './pages/Home'

// Admin 
import CreateCategory from './pages/Admin/Category/CreateCategory'
import Category from './pages/Admin/Category/Category'
import EditCategory from './pages/Admin/Category/EditCategory';
import Role from './pages/Admin/Role/Role';
import CreateRole from './pages/Admin/Role/CreateRole';
import EditRole from './pages/Admin/Role/EditRole';
import Course from './pages/Admin/Course/Course';
import CreateCourses from './pages/Admin/Course/CreateCourse';
import EditCourses from './pages/Admin/Course/EditCourse';
import Tutorial from './pages/Admin/Tutorial/Tutorial';
import CreateTutorial from './pages/Admin/Tutorial/CreateTutorial';
import EditTutorial from './pages/Admin/Tutorial/EditTutorial';
import Register from './pages/Register';
import Login from './pages/Login';
import User from './pages/Admin/User/User';
import EditUserPage from './pages/Admin/User/EditUser';
import DetailCourse from './pages/DetailCourse';
import DetailTutorial from './pages/DetailTutorial';
import UserProfil from './pages/UserProfil';
import CourseUser from './pages/Course';
import Apropos from './pages/Apropos';
import MentionsLegales from './pages/MentionsLegales';
import ConditionsGenerales from './pages/ConditionsGenerales';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Router>
        <ToastContainer
          oastClassName={(context) =>
            contextClass[context?.type || "default"] +
            "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
          }
          bodyClassName={() => "poppins-medium flex text-gray-700 text-sm font-white font-med block p-3"}
        />
        <Menu />
        <div className='content overflow-hidden w-full'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail-course/:id" element={<DetailCourse />} />
            <Route path="/courses/:courseId/tutorials/:tutorialId" element={<DetailTutorial />} />
            <Route path="/les-tutos" element={<CourseUser />} />
            <Route path="/profil" element={<UserProfil />} />
            <Route path="/a-propos" element={<Apropos />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/conditions-generales" element={<ConditionsGenerales />} />
            {/* User */}
            <Route path="/admin/user" element={<User />} />
            <Route path="/admin/users/:id/edit" element={<EditUserPage />} />
            {/* Cours Admin */}
            <Route path="/admin/courses" element={<Course />} />
            <Route path="/admin/courses/new" element={<CreateCourses />} />
            <Route path="/admin/courses/:id/edit" element={<EditCourses />} />
            {/* Tutorial Admin */}
            <Route path="/admin/tutorial" element={<Tutorial />} />
            <Route path="/admin/tutorial/new" element={<CreateTutorial />} />
            <Route path="/admin/tutorial/:id/edit" element={<EditTutorial />} />
            {/* Catégorie */}
            <Route path="/admin/category" element={<Category />} />
            <Route path="/admin/category/new" element={<CreateCategory />} />
            <Route path="/admin/category/:id/edit" element={<EditCategory />} />
            {/* Rôles */}
            <Route path="/admin/roles" element={<Role />} />
            <Route path="/admin/roles/new" element={<CreateRole />} />
            <Route path="/admin/roles/:id/edit" element={<EditRole />} />
            {/* Login et connexion */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  )
}

export default App
