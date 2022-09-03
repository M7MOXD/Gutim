import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import AdminFooter from './Footer';
import AdminHeader from './Header';
import AdminSideNav from './SideNav';
import axios from 'axios';

export default function AdminTrainers() {
  const token = localStorage.getItem('access');
  const [trainers, setTrainers] = useState([]);
  const [trainer, setTrainer] = useState({});
  const [trianerCard, setTrainertCard] = useState(false);
  const [createForm, setCreateForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [branches, setBranches] = useState([]);
  const [classes, setClasses] = useState([]);
  const [newTrainer, setNewTrainer] = useState({
    age: '',
    branch_id: '',
    class_id: '',
    experience: '',
    gender: '',
    image: '',
    name: '',
    phone: '',
  });
  const [editTrainer, setEditTrainer] = useState({
    id: '',
    age: '',
    branch_id: '',
    class_id: '',
    experience: '',
    gender: '',
    name: '',
    phone: '',
  });

  useEffect(() => {
    axios
      .get('https://gymmanagementapi.herokuapp.com/api/trainers/')
      .then((res) => {
        setTrainers(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get('https://gymmanagementapi.herokuapp.com/api/branch/')
      .then((res) => {
        setBranches(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get('https://gymmanagementapi.herokuapp.com/api/classes/')
      .then((res) => {
        setClasses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteItem = (id) => {
    axios
      .delete(
        `https://gymmanagementapi.herokuapp.com/api/trainers/delete/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setTrainers(
          trainers.filter((trainer) => {
            return trainer.id !== id;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const deleteTrainer = (e, id) => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to delete this item?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteItem(id),
        },
        {
          label: 'No',
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  const closeTrainerCard = () => {
    setTrainertCard(false);
  };

  const activateTrainerCard = (e, trainer) => {
    setCreateForm(false);
    setTrainertCard(true);
    const branch = branches.filter((branch) => {
      return branch.id === trainer.branch_id;
    });
    const cls = classes.filter((cls) => {
      return cls.id === trainer.class_id;
    });
    setTrainer({
      ...trainer,
      branch_id: branch[0].name,
      class_id: cls[0].name,
    });
  };

  const closeCreateModal = (e) => {
    e.preventDefault();
    setCreateForm(false);
  };

  const activateCreateForm = (e) => {
    e.preventDefault();
    setCreateForm(true);
    setTrainertCard(false);
  };

  const getNewTrainerName = (e) => {
    setNewTrainer({
      ...newTrainer,
      name: e.target.value,
    });
  };

  const getNewTrainerAge = (e) => {
    setNewTrainer({
      ...newTrainer,
      age: e.target.value,
    });
  };

  const getNewTrainerGender = (e) => {
    setNewTrainer({
      ...newTrainer,
      gender: e.target.value,
    });
  };

  const getNewTrainerImage = (e) => {
    setNewTrainer({
      ...newTrainer,
      image: e.target.files[0],
    });
  };

  const getNewTrainerPhone = (e) => {
    setNewTrainer({
      ...newTrainer,
      phone: e.target.value,
    });
  };

  const getNewTrainerExperience = (e) => {
    setNewTrainer({
      ...newTrainer,
      experience: e.target.value,
    });
  };

  const getNewTrainerBranch = (e) => {
    setNewTrainer({
      ...newTrainer,
      branch_id: e.target.value,
    });
  };

  const getNewTrainerClass = (e) => {
    setNewTrainer({
      ...newTrainer,
      class_id: e.target.value,
    });
  };

  const handelAddNewTRainer = (e) => {
    e.preventDefault();
    let errors = {};
    if (!newTrainer.name) {
      errors.name = 'Name can not be empty.';
    }
    if (!newTrainer.image) {
      errors.image = 'Image can not be empty.';
    }
    if (!newTrainer.phone) {
      errors.phone = 'Phone can not be empty.';
    }
    if (!newTrainer.experience) {
      errors.experience = 'Experience can not be empty.';
    }
    if (!newTrainer.age) {
      errors.age = 'Age can not be empty.';
    }
    if (!newTrainer.branch_id) {
      errors.branch_id = 'Branch can not be empty.';
    }
    setNewTrainer({
      ...newTrainer,
      errors,
    });
    if (!Object.keys(errors).length) {
      axios
        .post(
          'https://gymmanagementapi.herokuapp.com/api/trainers/create/',
          newTrainer,
          {
            headers: {
              authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          axios
            .get('https://gymmanagementapi.herokuapp.com/api/trainers/')
            .then((res) => {
              setTrainers(res.data);
            });
          setCreateForm(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const createTrainerForm = () => {
    return (
      <div className="mx-auto mt-5 w-75">
        <div className="card card-primary">
          <div className="card-header text-right">
            <h3 className="card-title">Create Trainer</h3>
            <button className="btn btn-danger" onClick={closeCreateModal}>
              X
            </button>
          </div>
          <form onSubmit={handelAddNewTRainer} encType="multipart/form-data">
            <div className="card-body">
              <div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    onChange={getNewTrainerName}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Age</label>

                  <input
                    type="text"
                    onChange={getNewTrainerAge}
                    className="form-control"
                    placeholder="Age"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Photo</label>
                  <input
                    type="file"
                    onChange={getNewTrainerImage}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    onChange={getNewTrainerGender}
                  >
                    <option>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    onChange={getNewTrainerPhone}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Experience</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Experience"
                    onChange={getNewTrainerExperience}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Branch</label>
                  <select
                    className="form-select"
                    onChange={getNewTrainerBranch}
                  >
                    <option>Select Branch</option>

                    {branches.map((branch) => {
                      return (
                        <option key={branch.id} value={branch.id}>
                          {branch.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Class</label>
                  <select className="form-select" onChange={getNewTrainerClass}>
                    <option>Select Class</option>
                    {classes.map((cls) => {
                      return (
                        <option key={cls.id} value={cls.id}>
                          {cls.name}
                        </option>
                      );
                    })}
                  </select>
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

  const closeEditModal = (e) => {
    e.preventDefault();
    setEditForm(false);
    setEditTrainer({
      id: '',
      age: '',
      branch_id: '',
      class_id: '',
      experience: '',
      gender: '',
      name: '',
      phone: '',
    });
  };

  const activateEditTrainerForm = (e, trainer) => {
    e.preventDefault();
    setCreateForm(false);
    setTrainertCard(false);
    setEditForm(true);
    const val = { ...trainer };
    delete val.image;
    setEditTrainer(val);
  };

  const getEditTrainerName = (e) => {
    setEditTrainer({
      ...editTrainer,
      name: e.target.value,
    });
  };

  const getEditTrainerAge = (e) => {
    setEditTrainer({
      ...editTrainer,
      age: e.target.value,
    });
  };

  const getEditTrainerGender = (e) => {
    setEditTrainer({
      ...editTrainer,
      gender: e.target.value,
    });
  };

  const getEditTrainerPhone = (e) => {
    setEditTrainer({
      ...editTrainer,
      phone: e.target.value,
    });
  };

  const getEditTrainerExperience = (e) => {
    setEditTrainer({
      ...editTrainer,
      experience: e.target.value,
    });
  };

  const getEditTrainerBranch = (e) => {
    setEditTrainer({
      ...editTrainer,
      branch_id: e.target.value,
    });
  };

  const getEditTrainerClass = (e) => {
    setEditTrainer({
      ...editTrainer,
      class_id: e.target.value,
    });
  };

  const handelEditTrainer = (e) => {
    e.preventDefault();
    let errors = {};
    if (!editTrainer.name) {
      errors.name = 'Name can not be empty.';
    }
    if (!editTrainer.phone) {
      errors.phone = 'Phone can not be empty.';
    }
    if (!editTrainer.experience) {
      errors.experience = 'Experience can not be empty.';
    }
    if (!editTrainer.age) {
      errors.age = 'Age can not be empty.';
    }
    if (!editTrainer.branch_id) {
      errors.branch_id = 'Branch can not be empty.';
    }
    setNewTrainer({
      ...editTrainer,
      errors,
    });

    if (!Object.keys(errors).length) {
      axios
        .patch(
          `https://gymmanagementapi.herokuapp.com/api/trainers/update/${editTrainer.id}/`,
          editTrainer,
          {
            headers: {
              authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          const newTrianers = trainers.filter((trainer) => {
            return trainer.id !== editTrainer.id;
          });
          setTrainers([...newTrianers, editTrainer]);
          setEditForm(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const editTrainerForm = () => {
    return (
      <div className="mx-auto mt-5 w-75">
        <div className="card card-primary">
          <div className="card-header text-right">
            <h3 className="card-title">Create Trainer</h3>
            <button className="btn btn-danger" onClick={closeEditModal}>
              X
            </button>
          </div>
          <form onSubmit={handelEditTrainer} encType="multipart/form-data">
            <div className="card-body">
              <div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    defaultValue={editTrainer.name}
                    onChange={getEditTrainerName}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input
                    type="text"
                    defaultValue={editTrainer.age}
                    onChange={getEditTrainerAge}
                    className="form-control"
                    placeholder="Age"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Photo</label>
                  <input type="file" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    value={editTrainer.gender}
                    onChange={getEditTrainerGender}
                  >
                    <option>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    defaultValue={editTrainer.phone}
                    onChange={getEditTrainerPhone}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Experience</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Experience"
                    defaultValue={editTrainer.experience}
                    onChange={getEditTrainerExperience}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Branch</label>
                  <select
                    className="form-select"
                    value={editTrainer.branch_id}
                    onChange={getEditTrainerBranch}
                  >
                    <option>Select Branch</option>
                    {branches.map((branch) => {
                      return (
                        <option key={branch.id} value={branch.id}>
                          {branch.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Class</label>
                  <select
                    className="form-select"
                    value={editTrainer.class_id}
                    onChange={getEditTrainerClass}
                  >
                    <option>Select Class</option>
                    {classes.map((cls) => {
                      return (
                        <option key={cls.id} value={cls.id}>
                          {cls.name}
                        </option>
                      );
                    })}
                  </select>
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

  const singleTrainerCard = () => {
    return (
      <div className="mx-auto mt-5 w-75">
        <div className="card card-primary">
          <div className="card-header text-right">
            <h3 className="card-title">{trainer.name}</h3>
            <button className="btn btn-danger" onClick={closeTrainerCard}>
              X
            </button>
          </div>
          <div className="card-body">
            <div>
              <div className="text-center">
                <img
                  src={`http://localhost:8000${trainer.image}`}
                  className="mt-5 mx-5"
                  height="250"
                  width="220"
                  alt=""
                />
              </div>
              <div className="mb-2 mt-5">
                <p>
                  <strong>Trainer Name: </strong>
                  <span className="mx-5">{trainer.name}</span>
                </p>
              </div>
              <div className="mb-2">
                <p>
                  <strong>Trainer Age: </strong>
                  <span className="mx-5">{trainer.age}</span>
                </p>
              </div>
              <div className="mb-2">
                <p>
                  <strong>Trainer Experience: </strong>
                  <span className="mx-5">{trainer.experience} years</span>
                </p>
              </div>
              <div className="mb-2">
                <p>
                  <strong>Trainer Gender: </strong>
                  <span className="mx-5">{trainer.gender}</span>
                </p>
              </div>
              <div className="mb-2">
                <p>
                  <strong>Trainer Phone: </strong>
                  <span className="mx-5">{trainer.phone}</span>
                </p>
              </div>
              <div className="mb-2">
                <p>
                  <strong>Trainer Branch: </strong>
                  <span className="mx-5">{trainer.branch_id}</span>
                </p>
              </div>
              <div className="mb-2">
                <p>
                  <strong>Trainer Class: </strong>
                  <span className="mx-5">{trainer.class_id}</span>
                </p>
              </div>
            </div>
            <button className="btn btn-danger" onClick={closeTrainerCard}>
              Close
            </button>
          </div>
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
                <h3 className="card-title">Trainers Table</h3>
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
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Phone</th>
                      <th>Experience (years)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainers.map((trainer) => {
                      return (
                        <tr key={trainer.id}>
                          <td>{trainer.id}</td>
                          <td>{trainer.name}</td>
                          <td>{trainer.age}</td>
                          <td>{trainer.gender}</td>
                          <td>{trainer.phone}</td>
                          <td>{trainer.experience}</td>
                          <td>
                            <button
                              className="btn btn-warning mx-2"
                              onClick={(e) =>
                                activateEditTrainerForm(e, trainer)
                              }
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={(e) => deleteTrainer(e, trainer.id)}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-info mx-2"
                              onClick={(e) => activateTrainerCard(e, trainer)}
                            >
                              Show
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
          <button className="btn btn-success w-50" onClick={activateCreateForm}>
            Add Trainer
          </button>
        </div>
        {trianerCard && singleTrainerCard()}
        {createForm && createTrainerForm()}
        {editForm && editTrainerForm()}
      </div>
      <AdminFooter />
    </React.Fragment>
  );
}
