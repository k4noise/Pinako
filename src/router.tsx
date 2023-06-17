import React, { useEffect } from 'react';
import { createHashRouter, Outlet, redirect, RouterProvider } from 'react-router-dom';
import Cookies from "js-cookie"
import { NotificationContainer } from 'react-notifications';

import Main from './Pages/Main/Main';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';
import RegisterForm from './Pages/Register/Register';
import LoginForm from './Pages/Login/Login';
import Users from './Pages/Users/Users';
import Profile from './Pages/Profile/Profile';
import Edit from './Pages/ProfileEdit/Edit';
import Artwork from './Components/Artwork/Artwork';
import About from './Pages/About/About';
import AddArtwork from './Pages/AddArtwork/AddArtwork';
import Error from './Pages/Error/Error';
import Search from './Pages/Search/Search';
import SearchServer from './Actions/Search';

const App = (): JSX.Element => {
  const router = createHashRouter([
    {
      element: (
        <>
          <Nav />
          <div className="App">
            <Outlet />
          </div>
          <Footer />
          <NotificationContainer />
        </>
      ),
      children: [
        {
          path: '/',
          element: <Main />,
        },
        {
          path: 'page/:pageId',
          element: <Main />
        },
        {
          path: '/login',
          element: <LoginForm />
        },
        {
          path: '/register',
          element: <RegisterForm />
        },
        {
          path: '/profile',
          loader: () => {
            if (!Cookies.get("accessToken"))
              return redirect('/401')
            return null;
          },
          element: <Profile isMine={true} />
        },
        {
          path: '/profile/edit',
          loader: () => {
            if (!Cookies.get("accessToken"))
              return redirect('/401')
            return null;
          },
          element: <Edit />,
        },
        {
          path: '/profile/upload',
          loader: () => {
            if (!Cookies.get("accessToken"))
              return redirect('/401')
            return null;
          },
          element: <AddArtwork />,
        },
        {
          path: '/users',
          element: <Users />,
        },
        {
          path: 'profile/:userId',
          element: <Profile isMine={false} />,
        },
        {
          path: 'profile/:userId/artwork/:artworkId',
          element: <Artwork />,
        },
        {
          path: '/about',
          element: <About />,
        },
        {
          path: '/search/:searchParams',
          loader: async ({ params }) => {
            const searchString = params.searchParams;
            const originQuery = searchString?.replaceAll('*', '#');
            return await SearchServer(originQuery);
          },
          element: <Search/>,
        },
        {
          path: '404',
          element: <Error number={404} description='Страница не найдена'/>
        },
        {
          path: '401',
          element: <Error number={401} description='Войдите для просмотра страницы'/>
        },
        {
          path: '403',
          element: <Error number={403} description='Вы уже вошли'/>
        },
        {
          path: '*',
          loader: () => redirect('404'),
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
