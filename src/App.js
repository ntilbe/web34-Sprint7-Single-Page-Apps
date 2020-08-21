import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from 'react-router-dom' // from node_modules
import Form from './Form'
import Home from './Home'
import * as yup from 'yup'
import FormSchema from './validation/FormSchema'

const initialFormValues = {
  name: '',
  size: '',
  pepperoni: false,
  olives: false,
  pineapple: false,
  bacon: false,
  instructions: ''
}

const initialFormErrors = {
  name: '',
  size: ''
}

const initialOrders = []

const initialDisabled = true

const App = () => {

  //State//
  const [orders, setOrders] = useState(initialOrders)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const addOrder = newOrder => {
    setOrders(newOrder)
    setFormValues(initialFormValues)
    console.log(newOrder)

  }

  const inputChange = (name, value) => {
    yup
      .reach(FormSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })

    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const checkboxChange = (name, isChecked) => {
    setFormValues({
      ...formValues,
      [name]: isChecked 
    })
  }

  const submit = () => {
    const newOrder = {
      name: formValues.name.trim(),
      size: formValues.size,
      pepperoni: formValues.pepperoni,
      olives: formValues.olives,
      pineapple: formValues.pineapple,
      bacon: formValues.bacon,
      instructions: formValues.instructions
    }
    addOrder(newOrder)
  }

  useEffect(() => {
    FormSchema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])

  return (
    <div>
      <header>
        <Link className="headerName" to='/'>
          <h1>Lambda Eats</h1>
        </Link>
      </header>
      <Switch>
        <Route path='/pizza'>
          <Form 
          values={formValues}
          submit={submit}
          inputChange={inputChange}
          checkboxChange={checkboxChange}
          disabled={disabled}
          formErrors={formErrors}
          />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </div>

  );
};
export default App;