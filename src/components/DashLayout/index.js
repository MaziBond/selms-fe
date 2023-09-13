import React, { useContext, useState } from 'react';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import TimeOffStatistics from '../TimeOffStatistics';
import Card from 'react-bootstrap/Card';
import { useQuery, useMutation } from 'react-query';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { 
  postData, 
  getData,
  toastProperty, 
  success, 
  UserDetails,
  putData
} from '../../Data';

import './index.scss';

const docLinks = [
  {
    name: 'Personal leave application form', 
    link: 'https://res.cloudinary.com/skybound/image/upload/v1693862473/personal_leave_application_form.pdf'
  },
  {
    name: 'Parental Leave Application_Form',
    link: 'https://res.cloudinary.com/skybound/image/upload/v1693862470/Parental_Leave_Application_Form.pdf',
  },
  {
    name: 'Vacation Leave Application Form',
    link: 'https://res.cloudinary.com/skybound/raw/upload/v1693862470/Vacation_Leave_Application_Form.doc',
  },
  {
    name: 'Sick Leave Application',
    link: 'https://res.cloudinary.com/skybound/image/upload/v1693862469/Sick_Leave_Application_Form.pdf',
  },
  {
    name: 'Annual Leave Application Form',
    link: 'https://res.cloudinary.com/skybound/image/upload/v1693862468/ANNUAL_LEAVE_APPLICATION_FORM.pdf',
  },
  {
    name: 'Leave Application Form',
    link: 'https://res.cloudinary.com/skybound/raw/upload/v1693862467/Leave_Application_Form_For_Company.doc',
  },
  {
    name: 'Vacation Leave Application Form',
    link: 'https://res.cloudinary.com/skybound/raw/upload/v1693862470/Vacation_Leave_Application_Form.doc',
  },
  {
    name: 'Vacation Leave Application Form',
    link: 'https://res.cloudinary.com/skybound/raw/upload/v1693862470/Vacation_Leave_Application_Form.doc',
  },
];

const DashLayout = ({ currentScreen }) => {
  const user = useContext(UserDetails);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState({});
  const { data, error }  = useQuery('totalData', () => getData('stats/'));
  const calenderData = useQuery('calender', () => getData(`leave-request/calendar-events/${user.userDetails.id}`))
  const [applyLeaveForm, setApplyLeaveForm] = useState({
    leaveStart: '' , 
    leaveEnd: '',
    eventType: '',
    description:  '',
  })
  const [showLeaveModalApproval, setShowLeaveModalApproval] = useState(false);
  const userList = useQuery('userList', () => getData('user/admin/all-users'));
  const leaveQuestList = useQuery('leaveRequest', () => getData(`leave-request/requests/${user?.userDetails?.id}`));
  const users_status = userList?.data?.payload?.users;
  const [selectManagerData, setSelectManagerData] = useState({});
  const [addReason, setAddReason] = useState('');
  console.log(calenderData, 'calenderData calenderData', calenderData?.payload?.calendar_events);
  const handleLogout = () => {
    Toastify({
      text: "Logout was successful",
      ...toastProperty,
      style: success
    }).showToast();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    user.setUserDetails({});
    user.setTokenItem()
    navigate('/login');
  };

  const getEvents = () => {
    return [
      {
        title: 'Meeting 1',
        start: new Date(2023, 7, 25, 10, 0),
        end: new Date(2023, 7, 25, 11, 0),
      },
      {
        title: 'Meeting 2',
        start: new Date(2023, 7, 26, 14, 0),
        end: new Date(2023, 7, 26, 15, 0),
      },
      // Add more events here
    ];
  };

  const localizer = momentLocalizer(moment);
  const [events] = useState(calenderData?.payload?.calendar_events);

  const handleApproval = (value) => {
    console.log(value)
  };

  const handleClose = () => {
    setShow(false);
    setSelectedStaff({})
  };

  const mutationSubmitLeaveRequest = useMutation((data) => putData(data, 'leave-request/update'), {
    onSuccess: (res) => {
      setShowLeaveModalApproval(false);
      Toastify({
        text: res.msg,
        ...toastProperty,
        style: success,
      }).showToast();
    },
  });

  const mutationLeaveRequest = useMutation((data) => postData(data, 'leave-request/create'), {
    onSuccess: (res) => {
      setApplyLeaveForm({})
      Toastify({
        text: res.msg,
        ...toastProperty,
        style: success,
      }).showToast();
    },
  });

  const handleLeaveApproval = (leaveList, status) => {
    const data = {
      userId: selectedStaff.id ,
      managerId: selectedStaff.manager.id,
      leaveRequestId: leaveList.id,
      status: status,
      reason: addReason,
    };
    mutationSubmitLeaveRequest.mutate(data);
  };

  const handleShow = () => setShow(true);

  const DashboardContent = () => (
    <section className="dashLayout__first">
      <main className="dashLayout__first-main">
        <div className="dashLayout__div">
          <h1 className='dashLayout__title'> 
            Summary
          </h1>
          < button className="dashLayout__button">Export Data</button>
        </div>
        <div className="dashLayout__items">
          <div  className="dashLayout__item">
            <div className="dashLayout__item-cover">
              <p>Total employees</p>
              <div className="dashLayout__item-content">
                <h1>{data?.payload?.total_employees}</h1>
                <p>23%</p>
              </div>
            </div>
              <div className="dashLayout__item-descr">
                <p>13 applications need review</p>
              </div>
            </div>

            <div  className="dashLayout__item">
            <div className="dashLayout__item-cover">
              <p>Total Leave Application</p>
              <div className="dashLayout__item-content">
                <h1>{data?.payload?.total_leave_applications}</h1>
                <p>30%</p>
              </div>
            </div>
              <div className="dashLayout__item-descr">
                <p>98 leave application</p>
              </div>
            </div>

            <div  className="dashLayout__item">
              <div className="dashLayout__item-cover">
                <p>Total Paid Leave</p>
                <div className="dashLayout__item-content">
                  <h1>{data?.payload?.total_paid_leave}</h1>
                  <p>3%</p>
                </div>
              </div>
              <div className="dashLayout__item-descr">
                <p>80 paid leave approved</p>
              </div>
            </div>

            <div  className="dashLayout__item">
              <div className="dashLayout__item-cover">
                <p>Total Pending Application</p>
                <div className="dashLayout__item-content">
                  <h1>{data?.payload?.total_pending_applications}</h1>
                  <p>23%</p>
                </div>
              </div>
              <div className="dashLayout__item-descr">
                <p>50 pending application approval</p>
              </div>
            </div>

        </div>

        <main className="dashLayout__down">
          <div className="dashLayout__down-div1">
            <h1 className="dashLayout__down-h1">Time Off Statistics</h1>
            <div className="dashLayout__down-p">
              <span className="dashLayout__dot-cover">
                <div className="dashLayout__dot"/>
                <p> Sick leave</p>
              </span>
              <span className="dashLayout__dot-cover">
                <div className="dashLayout__dot" style={{ background: '#FFD459'}}/>
                <p>Paid leave</p>
              </span>
              <span 
                className="dashLayout__dot-cover">
                <div className="dashLayout__dot" style={{ background: '#DC146C'}}/>
                <p>Unpaid leave</p>
              </span>
            </div>
            <TimeOffStatistics data={data} />
          </div>
        </main>
      </main>
      <main className="dashLayout__first-two">
        <h1 className="dashLayout__sche">Upcoming Schedule</h1>
        <Calendar
          localizer={localizer}
          events={events}
          views={['month', 'work_week', 'agenda']}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </main>
    </section>
  );

  const { firstName, lastName, emailAddress, role } = user.userDetails;

  const mutation = useMutation((data) => postData(data, 'user/assign-manager'), {
    onSuccess: (res) => {
      if(res.msg === 'User does not exist') {
        Toastify({
          text: res.msg,
          ...toastProperty,
          style: error,
        }).showToast();
      }
      else {
        Toastify({
          text: "Manager assigned successfully",
          ...toastProperty,
          style: success,
        }).showToast();
      }
    },
  });

  const leaveListData = leaveQuestList.data?.payload?.leave_requests;

  const handleAddManager = () => {
    const data = {
      subordinateId: selectedStaff.id,
      managerId: Number(selectManagerData),
      superAdminId: user?.userDetails.id,
    };
    mutation.mutate(data);
    handleClose();
  };

  const EmployeeScreen = () => {
    return (
      <div className="dashLayout__account-tab">
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
        <Tab eventKey="home" title="Employee List">
          <div className="dashLayout__employ">
            <h1 className="dashLayout__employ-title">Employee List</h1>
            <div>
              {
                user.userDetails.role === 'Super admin'
                ? (
                  <Table striped bordered hover size="lg">
                    <thead>
                      <tr>
                        <th>#Id</th>
                        <th>Full Name</th>
                        <th>Email Address</th>
                        <th>Manager</th>
                        <th>View leaves</th>
                        <th>Assign a Manager</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      users_status?.map((employee, index) => (
                        <tr key={index}>
                          <td>{employee.id}</td>
                          <td>{`${employee.firstName} ${employee.lastName}`}</td>
                          <td>{employee.emailAddress}</td>
                          <td>{employee.manager == null ? 'Not assigned' : employee.manager.managerName}</td>
                          <td>
                            {
                              employee.leave_requests.length === 0
                              ? 'No leave application'
                              : (
                                <Button
                                variant="outline-primary" 
                                onClick={() => {
                                  setSelectedStaff(employee)
                                  setShowLeaveModal(true)
                                }
                              }
                              >
                                View Leaves
                                </Button>
                              )
                            }
                          </td>
                          <td>
                            <Button 
                              variant="outline-primary" 
                              onClick={() => {
                                setSelectedStaff(employee)
                                handleShow()
                                }
                              }
                            >
                              Open
                              </Button>
                            </td>
                        </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                )
                :
                (
                  <Table striped bordered hover size="lg">
                    <thead>
                        <tr>
                          <th>#Id</th>
                          <th>Full Name</th>
                          <th>Email Address</th>
                          <th>Manager</th>
                          <th>View leaves</th> 
                        </tr>
                    </thead>
                    <tbody>
                      {
                        users_status.filter((noManager) => noManager.manager != null).filter((sameManager) => sameManager.manager.managerName === `${firstName} ${lastName}`)
                        ?.map((employee, index) => (
                          <tr key={index}>
                            <td>{employee.id}</td>
                            <td>{`${employee.firstName} ${employee.lastName}`}</td>
                            <td>{employee.emailAddress}</td>
                            <td>{employee?.manager?.managerName}</td>
                            <td>
                              {
                                employee.leave_requests.length === 0
                                  ? 'No leave application'
                                  : (
                                    <Button
                                    variant="outline-primary" 
                                    onClick={() => {
                                      setSelectedStaff(employee)
                                      setShowLeaveModal(true)
                                    }
                                  }
                                  >
                                    View Leaves
                                    </Button>
                                  )
                              }
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                )
              }
  
            </div>
          </div>
        </Tab>
        <Tab eventKey="profile" title="Pending Leave Application">
        <div className="dashLayout__employ">
            <h1 className="dashLayout__employ-title">Pending Employee Leave List</h1>
            <div>
              {
                user.userDetails.role === 'Super admin'
                ? (
                  <Table striped bordered hover size="lg">
                    <thead>
                      <tr>
                        <th>#Id</th>
                        <th>Full Name</th>
                        <th>Email Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        users_status?.filter((employee) => employee.manager != null).map((employee, index) => (
                          <tr key={index}>
                            <td>{employee.id}</td>
                            <td>{`${employee.firstName} ${employee.lastName}`}</td>
                            <td>{employee.emailAddress}</td>
                            <td>
                              {
                                employee.leave_requests.length === 0
                                ? 'No leave application'
                                : (
                                  <Button
                                  variant="outline-primary" 
                                  onClick={() => {
                                    setSelectedStaff(employee)
                                    setShowLeaveModalApproval(true)
                                  }
                                }
                                >
                                  View Leaves
                                  </Button>
                                )
                              }
                            </td>
                          </tr>
                        ))
                      }
                  </tbody>
                  </Table>
                )
                : 
                (
                  <Table striped bordered hover size="lg">
                  <thead>
                    <tr>
                      <th>#Id</th>
                      <th>Full Name</th>
                      <th>Email Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users_status.filter((noManager) => noManager.manager != null).filter((sameManager) => sameManager.manager.managerName === `${firstName} ${lastName}`)
                        ?.map((employee, index) => (
                        <tr key={index}>
                          <td>{employee.id}</td>
                          <td>{`${employee.firstName} ${employee.lastName}`}</td>
                          <td>{employee.emailAddress}</td>
                          <td>
                            {
                              employee.leave_requests.length === 0
                              ? 'No leave application'
                              : (
                                <Button
                                variant="outline-primary" 
                                onClick={() => {
                                  setSelectedStaff(employee)
                                  setShowLeaveModalApproval(true)
                                }
                              }
                              >
                                View Leaves
                                </Button>
                              )
                            }
                          </td>
                        </tr>
                      ))
                    }
                </tbody>
              </Table>
                )
              }
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
    )
  };

  const AccountScreen = () => (
    <div className="dashLayout__account-tab">
    <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
    <Tab eventKey="home" title="Profile">
      <div className="dashLayout__account">
        <Form className="dashLayout__form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder={emailAddress} 
              disabled 
              className="dashLayout__form-item"
              size="sm"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Full name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder={`${firstName} ${lastName}`} 
              disabled 
              className="dashLayout__form-item"
              size="sm"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Role</Form.Label>
            <Form.Control  
              size="sm" 
              type="text" 
              placeholder={role} 
              disabled 
              className="dashLayout__form-item"
            />
          </Form.Group>
        </Form>
        <div>
        </div>
      </div>
    </Tab>
    <Tab eventKey="profile" title="My Leave">
      <Table striped bordered hover size="lg">
        <thead>
          <tr>
            <th>#Id</th>
            <th>Event Type</th>
            <th>Leave Start</th>
            <th>Leave End</th>
            <th>Status</th>
            <th>Description</th>
            <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {
              leaveListData?.map((leaveList, index) => (
                  <tr key={index}>
                    <td>{leaveList.id}</td>
                    <td>{leaveList.eventType}</td>
                    <td>{leaveList.leaveStart}</td>
                    <td>{leaveList.leaveEnd}</td>
                    <td>{leaveList.status}</td>
                    <td>{leaveList.description}</td>
                    <td>{leaveList.reason}</td>
                  </tr>
                )
              )
            }
          </tbody>
        </Table>
      </Tab>
    </Tabs>
  </div>

  );

  const downloadFile = (link) => window.location.href = link;

  const DocumentScreen = () => (
    <div className="dashLayout__document">
      {
        docLinks?.map((docLink) => (
          <Card style={{ width: '18rem',     padding: '20px', marginBottom: '20px' }} key={docLink}>
            <Card.Img variant="top" src="https://res.cloudinary.com/skybound/image/upload/v1693863186/document-svgrepo-com.png"/>
            <Card.Body>
              <Card.Title>{docLink.name}</Card.Title>
              <Card.Text>
                Link to leave the company leave application form
              </Card.Text>
              <Button 
                variant="primary" 
                size="lg" 
                style={{ marginTop: '10px' }}
                onClick={() => downloadFile(docLink.link)}
              >Download</Button>
            </Card.Body>
          </Card>
        ))
      }
    </div>

  );
    console.log(selectedStaff, 'selectedStaff');
  const handleApplyLeave = () => {
    const data = {
      userId: user.userDetails.id,
      ...applyLeaveForm
    };
    mutationLeaveRequest.mutate(data);
  };

  const leaveType = [
    'Holiday', 
    'Time off', 
    'Sick leave', 
    'Maternity leave',
    'Paternity leave', 
    'Training day'
  ];

  const screenObject = {
    Dashboard: <DashboardContent />,
    Employee: <EmployeeScreen />,
    Account: <AccountScreen />,
    Documents: <DocumentScreen />,
  };

  return (
    <div className="dashLayout">
      <div className="dashLayout__log">
        <h1 className="dashLayout__current">{currentScreen}</h1>
        <div className="dashLayout__log-div">
          <p>{`${user.userDetails.firstName} ${user.userDetails.lastName}`}</p>
          <Button 
            variant="outline-danger"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
        {screenObject[currentScreen]}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Assign Manager</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Staff Email address</Form.Label>
              <Form.Control size="lg" type="text" readOnly placeholder={selectedStaff?.emailAddress} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Staff Full Name</Form.Label>
              <Form.Control 
                size="lg" type="text" readOnly rows={3}
                placeholder={`${selectedStaff?.firstName} ${selectedStaff?.lastName}` }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Super admin Full Name</Form.Label>
              <Form.Control 
                type="text" 
                size="lg"
                rows={3} 
                placeholder={`${user?.userDetails.firstName} ${user?.userDetails.lastName}`}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Select Manager</Form.Label>
              <Form.Select 
                size="lg" 
                onChange={(e) => setSelectManagerData(e.target.value) }
              >
                <option>Select from dropdown</option>
                {
                  users_status?.map((user, index) => <option key={index} value={user.id}>{`${user.firstName} ${user.lastName}`}</option>)
                }
            </Form.Select>
            </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="outline-primary" onClick={handleAddManager}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {
          currentScreen === 'Setting' && (
            <div className="dashLayout__setting">
              <Tabs
                defaultActiveKey="apply"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="apply" title="Apply for leave">
                  <h1 className="dashLayout__setting-h1">Apply for leave</h1>
                  <Form style={{ width: "100%"}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label style={{ fontWeight: 'Bold' }}>Leave Start date</Form.Label>
                      <Form.Control 
                        type="date" 
                        placeholder="" 
                        name="leaveStart"
                        onChange={(e) => setApplyLeaveForm({
                          ...applyLeaveForm,
                          leaveStart: e.target.value
                        }) }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label style={{ fontWeight: 'Bold' }}>Leave End date</Form.Label>
                      <Form.Control 
                        type="date" 
                        placeholder="" 
                        name="leaveEnd"
                        onChange={(e) => setApplyLeaveForm({
                          ...applyLeaveForm,
                          leaveEnd: e.target.value
                        }) }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label style={{ fontWeight: 'Bold' }} >Event Type</Form.Label>
                    <Form.Select 
                      size="lg" 
                      name="eventType"
                      onChange={(e) => setApplyLeaveForm({
                        ...applyLeaveForm,
                        eventType: e.target.value
                      }) }
                    >
                      <option>Select from dropdown</option>
                        {
                          leaveType.map((type, index) => <option key={index} value={type}>{type}</option>)
                        }
                    </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label style={{ fontWeight: 'Bold' }}>Description</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="" 
                        name="description"
                        onChange={(e) => setApplyLeaveForm({
                          ...applyLeaveForm,
                          description: e.target.value
                        }) }
                      />
                    </Form.Group>
                  </Form>
                  <div className="dashLayout__submit-button">
                  <Button 
                    variant="outline-primary" 
                    onClick={handleApplyLeave}
                    >
                  Submit
                </Button>
                </div>
                </Tab>
                <Tab eventKey="calender" title="Calender">
                  <Calendar
                    localizer={localizer}
                    events={events}
                    views={['month', 'work_week', 'agenda']}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                  />
                </Tab>
              </Tabs>
          </div>
          ) 
        }
        <Modal show={showLeaveModal}>
          <Modal.Header closeButton>
            <Modal.Title>View Leaves</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <ListGroup>
            {
              selectedStaff.leave_requests
              ?.map((leaveList) => (
                <>
                  <ListGroup.Item>{leaveList.eventType}</ListGroup.Item>
                  <ListGroup.Item>{leaveList.isPaidLeave}</ListGroup.Item>
                  <ListGroup.Item>{leaveList.leaveStart}</ListGroup.Item>
                  <ListGroup.Item>{leaveList.leaveEnd}</ListGroup.Item>
                  <ListGroup.Item>{leaveList.status}</ListGroup.Item>
                  <ListGroup.Item>{leaveList.description}</ListGroup.Item>
                </>
              ))
            }
          </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowLeaveModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showLeaveModalApproval}>
          <Modal.Header closeButton>
            <Modal.Title>Approve or Reject Leaves</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <ListGroup>
            {
              selectedStaff?.leave_requests?.filter((request) => request.status === 'Pending')?.map((leaveList) => (
                <>
                  <ListGroup.Item>{leaveList.eventType}</ListGroup.Item>
                  <ListGroup.Item>{leaveList.isPaidLeave}</ListGroup.Item>
                  <ListGroup.Item>{leaveList.leaveStart}</ListGroup.Item>
                  <ListGroup.Item>{leaveList.leaveEnd}</ListGroup.Item>
                  <ListGroup.Item>{leaveList.status}</ListGroup.Item>
                  <ListGroup.Item>{leaveList.description}</ListGroup.Item>
                  <ListGroup.Item> 
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label style={{ fontWeight: 'Bold' }}>Add Reason</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Add Reason" 
                    name="reason"
                    onChange={(e) => setAddReason(e.target.value)}
                  />
                  </Form.Group>
                  <div className="dashLayout__add-reason">
                    <Button 
                      variant="outline-primary"
                      onClick={() =>handleLeaveApproval(leaveList, 'Approved')}
                      disabled={addReason.length === 0}
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="outline-danger"
                      onClick={() => handleLeaveApproval(leaveList, 'Rejected')}
                      disabled={addReason.length === 0}
                    >
                      Reject
                    </Button>
                  </div>
                  
                  </ListGroup.Item>
                  <br />
                </>
              ))
            }
          </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowLeaveModalApproval(false)}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
};

export default DashLayout;