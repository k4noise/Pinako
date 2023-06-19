import React, { useEffect } from 'react';
import { createHashRouter, Outlet, redirect, RouterProvider } from 'react-router-dom';
import Cookies from "js-cookie"
import { NotificationContainer } from 'react-notifications';
import { Request } from './Requests';

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
          loader: (async () => {
            let data = await Request.get(`/artworks/all?page=0&n=6`)

            for (let key in Object.keys(data.data)) {
              const userData = await Request.get(`/accounts/${data.data[key].userId}`);
              data.data[key].userName = userData.data.displayName;
              data.data[key].userAvatar = userData.data.pfpUrl;
            }
            return data.data;
          }),
          element: <Main />,
        },
        {
          path: '/page/:pageId',
          loader: (async ({ params }) => {
            let data = await Request.get(`/artworks/all?page=${params.pageId}&n=6`)
            for (let key in Object.keys(data.data)) {
              const userData = await Request.get(`/accounts/${data.data[key].userId}`);
              data.data[key].userName = userData.data.displayName;
              data.data[key].userAvatar = userData.data.pfpUrl;
            }
            return data.data;
          }),
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
          loader: async () => {
            if (!Cookies.get("accessToken"))
              return redirect('/401');
            const id = localStorage.getItem('id')
            const userData = await Request.get(`/accounts/${id}`);
            for (let key in Object.keys(userData.data.artworks)) {
              const artwork = (userData.data.artworks[key]);
              const a = await Request.get(`/artworks/${artwork.id}`)
              userData.data.artworks[key].tags = a.data.tags;
            }
            return userData;
          },
          element: <Profile isMine={true} />
        },
        {
          path: '/profile/edit',
          loader: async () => {
            if (!Cookies.get("accessToken"))
              return redirect('/401')
            const id = localStorage.getItem('id')
            return await Request.get(`/accounts/${id}`);
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
          path: '/users/:userNamePart',
          loader: (async ({ params }) => {
            const users = await Request.get(`/accounts?q=${params.userNamePart}`);
            return users;
          }),
          element: <Users />,
        },
        {
          path: '/profile/:userId',
          loader: (async ({ params }) => {
            const userData = await Request.get(`/accounts/${params.userId}`);
            for (let key in Object.keys(userData.data.artworks)) {
              const artwork = (userData.data.artworks[key]);
              const a = await Request.get(`/artworks/${artwork.id}`)
              userData.data.artworks[key].tags = a.data.tags;
            }
            return userData;
          }),
          element: <Profile isMine={false} />,
        },
        {
          path: '/artwork/:artworkId',
          loader: async ({ params }) => {
            try {
              const data = await Request.get(`/artworks/${params.artworkId}`);
              const user = await Request.get(`/accounts/${data.data.userId}`)
              data.data.userName = user.data.displayName;
              data.data.userPfp = user.data.pfpUrl;
              return data;
            }
            catch (error) {
              redirect('/404')
              return null;
            }
          },
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
            const data = await SearchServer(originQuery);
            for (let key in Object.keys(data)) {
              const artwork = (data[key]);
              const a = await Request.get(`/accounts/${artwork.userId}`)
              data[key].userName = a.data.displayName;
              data[key].avatarUrl = a.data.pfpUrl;
            }
            return data;
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
