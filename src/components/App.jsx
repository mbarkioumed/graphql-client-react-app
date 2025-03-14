import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import UserList from "./users/UserList";
import UserDetail from "./users/UserDetail";
import UserForm from "./users/UserForm";
import PostList from "./posts/PostList";
import PostDetail from "./posts/PostDetail";
import PostForm from "./posts/PostForm";
import CommentList from "./comments/CommentList";
import CommentForm from "./comments/CommentForm";
import LocationList from "./locations/LocationList";
import LocationForm from "./locations/LocationForm";
import TagList from "./tags/TagList";
import TagForm from "./tags/TagForm";

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <div className="container">
                    <Switch>
                        {/* User Routes */}
                        <Route exact path="/users" component={UserList} />
                        <Route
                            path="/users/new"
                            component={() => (
                                <UserForm onUserSaved={() => {}} />
                            )}
                        />
                        <Route
                            path="/users/:id"
                            component={({ match }) => (
                                <UserDetail userId={match.params.id} />
                            )}
                        />

                        {/* Post Routes */}
                        <Route exact path="/posts" component={PostList} />
                        <Route path="/posts/new" component={PostForm} />
                        <Route
                            path="/posts/:id"
                            component={({ match }) => (
                                <PostDetail postId={match.params.id} />
                            )}
                        />

                        {/* Comment Routes */}
                        <Route exact path="/comments" component={CommentList} />
                        <Route path="/comments/new" component={CommentForm} />

                        {/* Location Routes */}
                        <Route
                            exact
                            path="/locations"
                            component={LocationList}
                        />
                        <Route path="/locations/new" component={LocationForm} />

                        {/* Tag Routes */}
                        <Route exact path="/tags" component={TagList} />
                        <Route path="/tags/new" component={TagForm} />

                        {/* Home Route */}
                        <Route exact path="/" component={PostList} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
