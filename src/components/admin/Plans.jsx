import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import AdminFooter from './Footer';
import AdminHeader from './Header';
import AdminSideNav from './SideNav';
import axios from 'axios';

export default function AdminPlans() {
  const token = localStorage.getItem('access');
  const [plans, setPlans] = useState([]);
  const [createForm, setCreateForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    duration: '',
    price: '',
  });
  const [editPlan, setEditPlan] = useState({
    id: '',
    name: '',
    duration: '',
    price: '',
  });

  useEffect(() => {
    axios
      .get('https://gymmanagementapi.herokuapp.com/api/sub/plan/')
      .then((res) => {
        setPlans(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }, []);

  const deleteItem = (id) => {
    axios
      .delete(`https://gymmanagementapi.herokuapp.com/api/sub/plan/${id}/`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPlans(
          plans.filter((plan) => {
            return plan.id !== id;
          })
        );
      })
      .catch((err) => alert(err));
  };

  const deleteClass = (e, id) => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to delete this Plan?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteItem(id),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const closeCreateForm = (e) => {
    e.preventDefault();
    setCreateForm(false);
  };

  const ActivateCreateForm = (e) => {
    e.preventDefault();
    setEditForm(false);
    setCreateForm(true);
  };

  const getNewPlanName = (e) => {
    setNewPlan({
      ...newPlan,
      name: e.target.value,
    });
  };

  const getNewPlanDuration = (e) => {
    setNewPlan({
      ...newPlan,
      duration_months: e.target.value,
    });
  };

  const getNewPlanPrice = (e) => {
    setNewPlan({
      ...newPlan,
      price: e.target.value,
    });
  };

  const handelCreatPlan = (e) => {
    e.preventDefault();
    let errors = {};
    if (!newPlan.name) {
      errors.name = 'Name can not be empty.';
    }
    if (!newPlan.duration_months) {
      errors.duration_months = 'Name can not be empty.';
    }
    if (!newPlan.price) {
      errors.price = 'Name can not be empty.';
    }
    if (!Object.keys(errors).length) {
      axios
        .post('https://gymmanagementapi.herokuapp.com/api/sub/plan/', newPlan, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          axios
            .get('https://gymmanagementapi.herokuapp.com/api/sub/plan/')
            .then((res) => {
              setPlans(res.data);
            });
          setCreateForm(false);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.detail);
        });
    }
  };

  const createPlanForm = () => {
    return (
      <div className="mx-auto w-75 mt-5">
        <div className="card card-primary">
          <div className="card-header text-right">
            <h3 className="card-title">Create Class</h3>
            <button className="btn btn-danger" onClick={closeCreateForm}>
              X
            </button>
          </div>
          <form onSubmit={handelCreatPlan}>
            <div className="card-body">
              <div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    onChange={getNewPlanName}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price"
                    onChange={getNewPlanDuration}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price"
                    onChange={getNewPlanPrice}
                  />
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const closeEditForm = (e) => {
    e.preventDefault();
    setEditForm(false);
  };

  const activateEditForm = (e, plan) => {
    e.preventDefault();
    setCreateForm(false);
    setEditForm(true);
    setEditPlan(plan);
  };

  const getEditPlanName = (e) => {
    setEditPlan({
      ...editPlan,
      name: e.target.value,
    });
  };

  const getEditPlanDuration = (e) => {
    setEditPlan({
      ...editPlan,
      duration_months: e.target.value,
    });
  };

  const getEditPlanPrice = (e) => {
    setEditPlan({
      ...editPlan,
      price: e.target.value,
    });
  };

  const handelEditPlan = (e) => {
    e.preventDefault();
    let errors = {};
    if (!editPlan.name) {
      errors.name = 'Name can not be empty.';
    }
    if (!editPlan.duration_months) {
      errors.duration_months = 'Name can not be empty.';
    }
    if (!editPlan.price) {
      errors.price = 'Name can not be empty.';
    }
    if (!Object.keys(errors).length) {
      axios
        .put(
          `https://gymmanagementapi.herokuapp.com/api/sub/plan/${editPlan.id}/`,
          editPlan,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const newPlans = plans.filter((plan) => {
            return plan.id !== editPlan.id;
          });
          setPlans([...newPlans, editPlan]);
          setEditForm(false);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.detail);
        });
    }
  };

  const editPlanForm = () => {
    return (
      <div className="mx-auto w-75 mt-5">
        <div className="card card-primary">
          <div className="card-header text-right">
            <h3 className="card-title">Create Class</h3>
            <button className="btn btn-danger" onClick={closeEditForm}>
              X
            </button>
          </div>
          <form onSubmit={handelEditPlan}>
            <div className="card-body">
              <div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={editPlan.name}
                    onChange={getEditPlanName}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price"
                    value={editPlan.duration_months}
                    onChange={getEditPlanDuration}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price"
                    value={editPlan.price}
                    onChange={getEditPlanPrice}
                  />
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <AdminHeader />
      <AdminSideNav />
      <div className="content-wrapper">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Plans Table</h3>
                <div className="card-tools">
                  <div
                    className="input-group input-group-sm"
                    style={{ width: 150 }}
                  ></div>
                </div>
              </div>
              <div className="card-body table-responsive p-0">
                <table className="table text-nowrap text-center">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Duration</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map((plan) => {
                      return (
                        <tr key={plan.id}>
                          <td>{plan.id}</td>
                          <td>{plan.name}</td>
                          <td>{plan.duration_months} months</td>
                          <td>{plan.price}</td>
                          <td>
                            <button
                              className="btn btn-warning mx-2"
                              onClick={(e) => activateEditForm(e, plan)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={(e) => deleteClass(e, plan.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-success mx-2 w-50"
            onClick={ActivateCreateForm}
          >
            Add Plan
          </button>
        </div>
        {createForm && createPlanForm()}
        {editForm && editPlanForm()}
      </div>
      <AdminFooter />
    </React.Fragment>
  );
}
