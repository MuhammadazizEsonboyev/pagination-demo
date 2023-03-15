import { Pagination, PaginationItem } from "@mui/material";
import { Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row, } from "react-bootstrap";

function App() {
  const [countries, setCountries] = useState()
  const [page, setPage] = useState(3)
  const [limit, setLimit] = useState(5)
  const [len, setLen] = useState()


  const getdata = () => {
    axios.get(`http://localhost:4000/data?_limit=${limit}&_page=${page}`)
      .then((data) => {
        setCountries(data?.data)
      })
  }


  const allData = () => {
    axios.get(`http://localhost:4000/data`)
      .then((data) => {
        setLen(data?.data.length / limit)
      })
    }
    let pagenum = Math.ceil(len)

  useEffect(() => {
    getdata()
    allData()

  }, [limit, page])


  return (
    <>
      <Container>
        <Row className="justify-content-center mt-3">
          <Col xs={8}>
            <ListGroup>
              {countries?.map((value) => {
                return (
                  <>
                    <ListGroup.Item>{value.name}</ListGroup.Item>
                  </>
                )
              })}
            </ListGroup>
            <Stack spacing={2} className="mt-3">
              <Pagination
                color="secondary"
                count={pagenum}
                page={page}
                onChange={(_, num) => setPage(num)}
                renderItem={(item) => (
                  <PaginationItem
                    to={`?_limit=${limit}&page=${page}`}
                    {...item}
                  />
                )}
              />
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
