import { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { openDB } from "idb";
import { Edit2 } from "react-feather";
import './App.css';

const App = () => {
  const [show, setShow] = useState(false);
  const [sectorList, setSectorList] = useState([])
  const [userList, setUserList] = useState([])
  const [userCount, setUserCount] = useState(0)
  const [state, setState] = useState('Add')
  const [updateIndex, setUpdateIndex] = useState()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**
         * @function dbCreate
         * @params
         * @description used to create db and insert sector data into db
         */
  const dbCreate = async () => {
    openDB("db1", 1, {
      upgrade(db) {
        db.createObjectStore("sector");
        db.createObjectStore("user");
      }
    });
    const db1 = await openDB("db1", 1);
    db1.add("sector", "Manufacturing", 1)
    db1.add("sector", "Construction materials", 2)
    db1.add("sector", "Electronics and Optics", 3)
    db1.add("sector", "Food and Beverage", 4)
    db1.add("sector", "Bakery & confectionery products", 5)
    db1.add("sector", "Beverages", 6)
    db1.add("sector", "Fish & fish products", 7)
    db1.add("sector", "Meat & meat products", 8)
    db1.add("sector", "Milk & dairy products", 9)
    db1.add("sector", "Other", 10)
    db1.add("sector", "Sweets & snack food", 11)
    db1.add("sector", "Furniture", 12)
    db1.add("sector", "Bathroom/sauna", 13)
    db1.add("sector", "Bedroom", 14)
    db1.add("sector", "Children’s room", 15)
    db1.add("sector", "Kitchen", 16)
    db1.add("sector", "Living room", 17)
    db1.add("sector", "Office", 18)
    db1.add("sector", "Other (Furniture)", 19)
    db1.add("sector", "Outdoor", 20)
    db1.add("sector", "Project furniture", 21)
    db1.add("sector", "Machinery", 22)
    db1.add("sector", "Machinery components", 23)
    db1.add("sector", "Machinery equipment/tools", 24)
    db1.add("sector", "Manufacture of machinery", 25)
    db1.add("sector", "Maritime", 26)
    db1.add("sector", "Aluminium and steel workboats", 27)
    db1.add("sector", "Boat/Yacht building", 28)
    db1.add("sector", "Ship repair and conversion", 29)
    db1.add("sector", "Metal structures", 30)
    db1.add("sector", "Other", 31)
    db1.add("sector", "Repair and maintenance service", 32)
    db1.add("sector", "Metalworking", 33)
    db1.add("sector", "Construction of metal structures", 34)
    db1.add("sector", "Houses and buildings", 35)
    db1.add("sector", "Metal products", 36)
    db1.add("sector", "Metal works", 37)
    db1.add("sector", "CNC-machining", 38)
    db1.add("sector", "Forgings, Fasteners", 39)
    db1.add("sector", "Gas, Plasma, Laser cutting", 40)
    db1.add("sector", "MIG, TIG, Aluminum welding", 41)
    db1.add("sector", "Plastic and Rubber", 42)
    db1.add("sector", "Packaging", 43)
    db1.add("sector", "Plastic goods", 44)
    db1.add("sector", "Plastic processing technology", 45)
    db1.add("sector", "Blowing", 46)
    db1.add("sector", "Moulding", 47)
    db1.add("sector", "Plastics welding and processing", 48)
    db1.add("sector", "Plastic profiles", 49)
    db1.add("sector", "Printing", 50)
    db1.add("sector", "Advertising", 51)
    db1.add("sector", "Book/Periodicals printing", 52)
    db1.add("sector", "Labelling and packaging printing", 53)
    db1.add("sector", "Textile and Clothing", 54)
    db1.add("sector", "Clothing", 55)
    db1.add("sector", "Textile", 56)
    db1.add("sector", "Wood", 57)
    db1.add("sector", "Other (Wood)", 58)
    db1.add("sector", "Wooden building materials", 59)
    db1.add("sector", "Wooden houses", 60)
    db1.add("sector", "Other", 61)
    db1.add("sector", "Creative industries", 62)
    db1.add("sector", "Energy technology", 63)
    db1.add("sector", "Environment", 64)
    db1.add("sector", "Service", 65)
    db1.add("sector", "Business services", 66)
    db1.add("sector", "Engineering", 67)
    db1.add("sector", "Information Technology and Telecommunications", 68)
    db1.add("sector", "Data processing, Web portals, E-marketing", 69)
    db1.add("sector", "Programming, Consultancy", 70)
    db1.add("sector", "Software, Hardware", 71)
    db1.add("sector", "Telecommunications", 72)
    db1.add("sector", "Tourism", 73)
    db1.add("sector", "Translation services", 74)
    db1.add("sector", "Transport and Logistics", 75)
    db1.add("sector", "Air", 76)
    db1.add("sector", "Rail", 77)
    db1.add("sector", "Road", 78)
    db1.add("sector", "Water", 79)
    db1.close();
  }

  /**
         * @function getSector
         * @params
         * @description used to get the list of sector
         */
  const getSector = async () => {
    const db1 = await openDB("db1", 1);
    db1.getAll("sector").then(result => {
      setSectorList(result)
    });
    db1.count("user").then(result => {
      setUserCount(result)
    });
  }

  /**
         * @function getUser
         * @params
         * @description used to get the list of user
         */
  const getUser = async () => {
    const db1 = await openDB("db1", 1);
    db1.getAll("user").then(result => {
      setUserList(result)
    });
  }

  useEffect(() => {
    dbCreate()
  }, [])

  useEffect(() => {
    getSector()
  }, [])

  useEffect(() => {
    getUser()
  }, [])

  /**
         * @function onSubmit
         * @params data
         * @description used to add or update the user
         */
  const onSubmit = async (data) => {
    if (state === 'Add') {
      const db1 = await openDB("db1", 1);
      db1.add("user", JSON.stringify(data), userCount + 1)
      handleClose()
      getUser()
      setUserCount(userCount + 1)
      reset()
    } else {
      const db1 = await openDB("db1", 1);
      await db1.put("user", JSON.stringify(data), updateIndex);
      handleClose()
      getUser()
      setUpdateIndex()
      setState('Add')
      reset()
    }
  };

  return (
    <Container className='text-center'>
      <Table responsive striped hover className='mt-3 text-center'>
        <thead>
          <tr className='bg-secondary'>
            <th className='px-3 border-end'>Name</th>
            <th className='px-3 border-end'>Sector</th>
            <th className='px-3 border-end'>Agree</th>
            <th className='px-3 border-end'>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 && userList.map((item, index) => {
            return <tr key={index}>
              <td>{JSON.parse(item).name}</td>
              <td>{JSON.parse(item).sector}</td>
              <td>{JSON.parse(item).agree ? 'Yes' : 'No'}</td>
              <td>
                <Edit2 size={18} onClick={() => {
                  let defaultValues = {};
                  defaultValues.name = JSON.parse(item).name
                  defaultValues.sector = JSON.parse(item).sector
                  defaultValues.agree = JSON.parse(item).agree
                  reset({ ...defaultValues })
                  setUpdateIndex(index + 1)
                  setState('Update')
                  handleShow()
                }} />
              </td>
            </tr>
          })}
        </tbody>
      </Table>
      <Button className='w-25' variant="primary" onClick={() => {
        setState('Add')
    setUpdateIndex()
        reset()
        handleShow()
      }}>Add</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-4 field-group">
              <Form.Label className='mb-3'>Name</Form.Label>
              <Form.Control
                placeholder="Enter your name"
                {...register("name")}
              />
              {errors.name && <span className='text-danger fs-12 fw-500 mt-3'>{errors.name.message}</span>}
            </Form.Group>
            <Form.Group className="mb-4 field-group">
              <Form.Label className='mb-3'>Sector</Form.Label>
              <Form.Select
                {...register("sector", {
                  required: "Sector is required",
                })}
              >
                <option className='p-0' hidden value="">Select sector here</option>
                {sectorList.length > 0 && sectorList.map((item, index) => {
                  return <option value={item} key={index}>{item}</option>;
                })}
              </Form.Select>
              {errors.sector && <span className='text-danger fs-12 fw-500 mt-3'>{errors.sector.message}</span>}
            </Form.Group>

            <Form.Check
              className='w-100 mb-3'
              inline
              label='Agree to terms'
              name='agree'
              type="checkbox"
              id='agree'
              {...register("agree")}
            />

            <Form.Group className="my-3 field-group">
              <Button className='w-100 rounded-0' variant="primary" type="submit">Save</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;
