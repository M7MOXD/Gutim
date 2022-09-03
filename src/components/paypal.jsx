import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
const baseUrl = 'https://gymmanagementapi.herokuapp.com/api';

export default function Paypal(props) {
  const auth = useSelector((state) => state.auth.value);
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: function (data, actions) {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: props.context.price,
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          // This function captures the funds from the transaction.
          return actions.order.capture().then(function (details) {
            // This function shows a transaction success message to your buyer.
            if (props.type === 'plan') {
              axios.post(
                `${baseUrl}/sub/subscription/`,
                {
                  user_id: localStorage.getItem('user_id'),
                  plan_id: props.context.id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                  },
                }
              );
            } else if (props.type === 'class') {
              axios.post(
                `${baseUrl}/classes/attendant/subscribe/`,
                {
                  clas: props.context.name,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                  },
                }
              );
            } else if (props.type === 'event') {
              axios.post(
                `${baseUrl}/events/participants/subscribe/`,
                {
                  event: props.context.name,
                  attend_status: 'going',
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                  },
                }
              );
            }
          });
        },
        onCancel: function (data) {
          // Show a cancel page, or return to cart
          alert('You Cancled The Payment');
        },
        onError: function (err) {
          // For example, redirect to a specific error page
          console.log(err);
        },
      })
      .render(`#${props.context.name.split(' ').join('')}`);
  }, []);
  return (
    <React.Fragment>
      {auth || (
        <NavLink to="/login" className="btn btn-success">
          Login To Countinue
        </NavLink>
      )}
      {auth && <div id={props.context.name.split(' ').join('')}>Paypal</div>}
    </React.Fragment>
  );
}
/**
 * sb-viwrl20314967@personal.example.com
 * Ob4q#Q>h
 */
