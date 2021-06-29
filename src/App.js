import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import NewCategory from "./admin/pages/NewCategory";
import NewSong from "./admin/pages/NewSong";
import UpdateSong from "./admin/pages/UpdateSong";
import UpdateCategory from "./admin/pages/UpdateCategory";
import Auth from './auth/Auth';
import {AuthContext} from './shared/context/auth-context';
import {useAuth} from './shared/hooks/auth-hook';
import Navigation from './shared/components/Navigation/Navigation';
import Song from './songs/pages/Song';
import Collections from './playlists/pages/Collections';
import Playlist from './playlists/pages/Playlist';
import Category from './playlists/pages/Category';
import NewPlaylist from './playlists/pages/NewPlaylist';
import Search from './songs/pages/Search';
import Main from './songs/pages/Main';
import User from "./admin/pages/User";
import UpdateUser from "./admin/pages/UpdateUser";


const App = () => {
    const {token, login, logout, userId, role} = useAuth();

    useEffect(() => {
        if (!token) {
            localStorage.setItem('HaveAccess', JSON.stringify( 0 ));
        } else {
            localStorage.setItem('HaveAccess', JSON.stringify( 0 ));
        }
    }, []);

    let routes;
    if (token) {
        routes= (
            <Switch>
                <Route path={'/admin/newCategory'} component={NewCategory} />
                <Route path={'/admin/updateCategory/:categoryId'} component={UpdateCategory} />
                <Route path={'/admin/newSong'} component={NewSong} />
                <Route path={'/admin/updateSong/:songId'} component={UpdateSong} />
                <Route path={'/admin/users'} component={User} />
                <Route path={'/admin/updateUser/:userId'} component={UpdateUser} />

                <Route path={'/users/:userId/playlists/:playlistId'} component={Playlist} />
                <Route path={'/users/:userId/newPlaylist'} component={NewPlaylist} />
                <Route path={'/users/:userId/playlists'} component={Collections} />
                <Route path={'/api/songs/:songId'} component={Song} />
                <Route path={'/api/categories/:categoryId'} component={Category} />
                <Route path={'/api/search'} component={Search} />
                <Route path={'/login'} component={Auth} />
                <Route to='/' exact component={Main} />
                <Redirect to='/' />
            </Switch>
        )} else {
            routes = (<Switch>
                <Route path={'/users/:userId/playlists/:playlistId'} component={Playlist} />
                <Route path={'/users/:userId/playlists'} component={Collections} />
                <Route path={'/api/songs/:songId'} component={Song} />
                <Route path={'/api/categories/:categoryId'} component={Category} />
                <Route path={'/api/search'} component={Search} />
                <Route path={'/login'} component={Auth} />
                <Route path="/logout">
                        <Redirect to="/" />
                </Route>
                <Route to='/' exact component={Main} />
                <Redirect to='/' />
            </Switch>
            )
        }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                role: role,
                login: login,
                logout: logout
            }}
        >
            <BrowserRouter>
                <main >
                    <Navigation />
                    {routes}
                </main>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;