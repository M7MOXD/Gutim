import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import AdminFooter from './Footer';
import AdminHeader from './Header';
import AdminSideNav from './SideNav';
import axios from 'axios';

export default function AdminEvents() {
  const token = localStorage.getItem('access');
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({});
  const [createForm, setCreateForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [eventCard, setEventCard] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    photo: '',
    capacity: '',
    start_date: '',
    end_date: '',
  });
  const [editEvent, setEditEvent] = useState({
    id: '',
    name: '',
    description: '',
    capacity: '',
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/events/')
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:8000/api/events/modify/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEvents(
          events.filter((event) => {
            return event.id !== id;
          })
        );
      })
      .catch((err) => alert(err));
  };

  const deleteEvent = (e, id) => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to delete this Event?',
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

  const closeCreateForm = (e) => {
    e.preventDefault();
    setCreateForm(false);
  };

  const openCreateForm = (e) => {
    e.preventDefault();
    setCreateForm(true);
    setEditForm(false);
    setEventCard(false);
  };

  const getNewEventName = (e) => {
    setNewEvent({
      ...newEvent,
      name: e.target.value,
    });
  };

  const getNewEventDescription = (e) => {
    setNewEvent({
      ...newEvent,
      description: e.target.value,
    });
  };

  const getNewEventPhoto = (e) => {
    setNewEvent({
      ...newEvent,
      photo: e.target.files[0],
    });
  };

  const getNewEventCapacity = (e) => {
    setNewEvent({
      ...newEvent,
      capacity: e.target.value,
    });
  };

  const getNewEventStartDate = (e) => {
    setNewEvent({
      ...newEvent,
      start_date: e.target.value,
    });
  };

  const getNewEventPrice = (e) => {
    setNewEvent({
      ...newEvent,
      price: e.target.value,
    });
  };

  const getNewEventEndDate = (e) => {
    setNewEvent({
      ...newEvent,
      end_date: e.target.value,
    });
  };

  const handelCreateEvent = (e) => {
    e.preventDefault();
    let errors = {};
    if (!newEvent.name) {
      errors.name = 'Name can not be empty.';
    }
    if (!newEvent.description) {
      errors.description = 'Description can not be empty.';
    }
    if (!newEvent.price) {
      errors.price = 'Phone can not be empty.';
    }
    if (!newEvent.start_date) {
      errors.start_date = 'Phone can not be empty.';
    }
    if (!newEvent.end_date) {
      errors.end_date = 'Phone can not be empty.';
    }
    setNewEvent({
      ...newEvent,
      errors,
    });
    if (!Object.keys(errors).length) {
      axios
        .post('http://localhost:8000/api/events/create/', newEvent, {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          axios.get('http://localhost:8000/api/events/').then((res) => {
            setEvents(res.data);
          });
          setCreateForm(false);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  };

  const createEventForm = () => {
    return (
      <div className="mx-auto w-75 mt-5">
        <div className="card card-primary">
          <div className="card-header text-right">
            <h3 className="card-title">Create Event</h3>
            <button className="btn btn-danger" onClick={closeCreateForm}>
              X
            </button>
          </div>
          <form onSubmit={handelCreateEvent} encType="multipart/form-data">
            <div className="card-body">
              <div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    onChange={getNewEventName}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>

                  <textarea
                    className="form-control"
                    onChange={getNewEventDescription}
                    rows={3}
                    defaultValue={''}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Photo</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={getNewEventPhoto}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Capacity</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Capacity"
                    onChange={getNewEventCapacity}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price"
                    onChange={getNewEventPrice}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Start date</label>
                  <input
                    type="date"
                    className="form-control"
                    value="2022-08-01"
                    onChange={getNewEventStartDate}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">End date</label>
                  <input
                    type="date"
                    className="form-control"
                    value="2023-08-01"
                    onChange={getNewEventEndDate}
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
    setEditEvent({
      id: '',
      name: '',
      description: '',
      photo: '',
      capacity: '',
      start_date: '',
      end_date: '',
    });
  };

  const activateEditForm = (e, event) => {
    e.preventDefault();
    setEditForm(true);
    setCreateForm(false);
    setEventCard(false);
    const val = { ...event };
    delete val.photo;
    setEditEvent(val);
  };

  const getEditEventName = (e) => {
    setEditEvent({
      ...editEvent,
      name: e.target.value,
    });
  };

  const getEditEventDescription = (e) => {
    setEditEvent({
      ...editEvent,
      description: e.target.value,
    });
  };

  const getEditEventCapacity = (e) => {
    setEditEvent({
      ...editEvent,
      capacity: e.target.value,
    });
  };

  const getEditEventStartDate = (e) => {
    setEditEvent({
      ...editEvent,
      start_date: e.target.value,
    });
  };

  const getEditEventPrice = (e) => {
    setEditEvent({
      ...editEvent,
      price: e.target.value,
    });
  };

  const getEditEventEndDate = (e) => {
    setEditEvent({
      ...editEvent,
      end_date: e.target.value,
    });
  };

  const handelEditEvent = (e) => {
    e.preventDefault();
    let errors = {};
    if (!editEvent.name) {
      errors.name = 'Name can not be empty.';
    }
    if (!editEvent.description) {
      errors.description = 'Description can not be empty.';
    }
    if (!editEvent.price) {
      errors.price = 'Phone can not be empty.';
    }
    if (!editEvent.start_date) {
      errors.start_date = 'Phone can not be empty.';
    }
    if (!editEvent.end_date) {
      errors.end_date = 'Phone can not be empty.';
    }
    setEditEvent({
      ...editEvent,
      errors,
    });
    if (!Object.keys(errors).length) {
      axios
        .patch(
          `http://localhost:8000/api/events/modify/${editEvent.id}/`,
          editEvent,
          {
            headers: {
              authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          const newEvents = events.filter((event) => {
            return event.id !== editEvent.id;
          });
          setEvents([...newEvents, editEvent]);
          setEditForm(false);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  };

  const editEventForm = () => {
    return (
      <div className="mx-auto w-75 mt-5">
        <div className="card card-primary">
          <div className="card-header text-right">
            <h3 className="card-title">Edit Event</h3>
            <button className="btn btn-danger" onClick={closeEditForm}>
              X
            </button>
          </div>
          <form onSubmit={handelEditEvent} encType="multipart/form-data">
            <div className="card-body">
              <div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={editEvent.name}
                    onChange={getEditEventName}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>

                  <textarea
                    className="form-control"
                    value={editEvent.description}
                    onChange={getEditEventDescription}
                    rows={3}
                    defaultValue={''}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Photo</label>
                  <input type="file" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Capacity</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Capacity"
                    value={editEvent.capacity}
                    onChange={getEditEventCapacity}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price"
                    value={editEvent.price}
                    onChange={getEditEventPrice}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Start date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={editEvent.start_date}
                    onChange={getEditEventStartDate}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">End date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={editEvent.end_date}
                    onChange={getEditEventEndDate}
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

  const closeEventCard = () => {
    setEventCard(false);
  };

  const activateClassCard = (e, event) => {
    setEventCard(true);
    setEditForm(false);
    setCreateForm(false);
    setEvent(event);
  };

  const singleEventCard = () => {
    return (
      <div className="mx-auto w-75 mt-5">
        <div className="card card-primary">
          <div className="card-header text-right">
            <h3 className="card-title">{event.name} Class</h3>
            <button className="btn btn-danger" onClick={closeEventCard}>
              X
            </button>
          </div>
          <div className="card-body">
            <div>
              <div className="mb-5">
                <img
                  src={event.photo}
                  className="mt-5 mx-5"
                  height="350"
                  width="700"
                  alt=""
                />
              </div>
              <div className="mb-5">
                <p>
                  <strong>Event Name: </strong>
                  <span className="mx-5">{event.name}</span>
                </p>
              </div>
              <div className="mb-5">
                <p>
                  <strong>Event Description:</strong>
                </p>
                <p className="mx-5 border">{event.description}</p>
              </div>
              <div className="mb-5">
                <p>
                  <strong>Event Price: </strong>
                  <span className="mx-5">{event.price} EGP</span>
                </p>
              </div>
              <div className="mb-5">
                <p>
                  <strong>Event Capacity: </strong>
                  <span className="mx-5">{event.capacity}</span>
                </p>
              </div>
              <div className="mb-5">
                <p>
                  <strong>Start Date: </strong>
                  <span className="mx-5">{event.start_date.substr(0, 10)}</span>
                </p>
                <p>
                  <strong>End Date: </strong>
                  <span className="mx-5">{event.end_date.substr(0, 10)}</span>
                </p>
              </div>
            </div>
            <button className="btn btn-danger" onClick={closeEventCard}>
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
                <h3 className="card-title">Events Table</h3>
                <div className="card-tools">
                  <div
                    className="input-group input-group-sm"
                    style={{ width: 150 }}
                  >
                    <input
                      type="text"
                      name="table_search"
                      className="form-control float-right"
                      placeholder="Search"
                    />
                    <div className="input-group-append">
                      <button type="submit" className="btn btn-default">
                        <i className="fas fa-search" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body table-responsive p-0">
                <table className="table text-nowrap text-center">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Capacity</th>
                      <th>Start date</th>
                      <th>End date</th>
                      <th>Price(EGP)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => {
                      return (
                        <tr key={event.id}>
                          <td>{event.id}</td>
                          <td>{event.name}</td>
                          <td>{event.capacity}</td>
                          <td>{event.start_date.substring(0, 10)}</td>
                          <td>{event.end_date.substring(0, 10)}</td>
                          <td>{event.price}</td>
                          <td>
                            <button
                              className="btn btn-warning mx-2"
                              onClick={(e) => activateEditForm(e, event)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={(e) => deleteEvent(e, event.id)}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-info mx-2"
                              onClick={(e) => activateClassCard(e, event)}
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
          <button className="btn btn-success w-50" onClick={openCreateForm}>
            Add Event
          </button>
        </div>
        {createForm && createEventForm()}
        {editForm && editEventForm()}
        {eventCard && singleEventCard()}
      </div>
      <AdminFooter />
    </React.Fragment>
  );
}
