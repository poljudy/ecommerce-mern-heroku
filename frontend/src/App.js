import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import NotFound from './components/layout/NotFound'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import ProductsListScreen from './screens/ProductsListScreen'
import OrdersListScreen from './screens/OrdersListScreen'
import UsersListScreen from './screens/UsersListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductEditScreen from './screens/ProductEditScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/register' component={RegisterScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/admin/orders' component={OrdersListScreen} />
            <Route path='/admin/users' component={UsersListScreen} />
            <Route
              path='/admin/products/:pagenumber'
              component={ProductsListScreen}
              exact
            />
            <Route
              path='/admin/products'
              component={ProductsListScreen}
              exact
            />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route
              path='/admin/product/:id/edit'
              component={ProductEditScreen}
            />
            <Route path='/search/:keyword' component={HomeScreen} exact />
            <Route path='/page/:pagenumber' component={HomeScreen} exact />
            <Route
              path='search/:keyword/page/:pagenumber'
              component={HomeScreen}
              exact
            />
            <Route path='/' component={HomeScreen} exact />
            <Route path='/not-found' component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
