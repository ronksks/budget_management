import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Row } from "react-bootstrap";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import { deleteTransactions } from "../actions/transactionAction";

/*
 * info component that shows the details of a selected transaction
 * allows also to update and delete directly from it
 * */
export const TransactionInfoComponent = () => {
  const { transactionId } = useParams();
  // subscribe to the store and get the state
  const tsStore = useSelector(
    (state) => state.transactions.filteredTransactions,
  );
  // find the wanted transaction by its id
  const transaction = tsStore.find(
    (transaction) => transaction.transaction_id === parseInt(transactionId),
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  const goBack = () => navigate("/table");

  /*** Handlers ***/
  // update handler
  const updateTransactionHandler = () => {
    navigate("/transaction", { state: { transaction } });
  };

  // delete handler
  const deleteSelectedHandler = () => {
    console.log(transaction);

    dispatch(deleteTransactions([transactionId], userId));
    navigate("/table");
  };
  if (!transaction) {
    return <div></div>;
  }

  return (
    <>
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Row className="mb-3">
          <h2>Transaction Information</h2>
        </Row>
        <Card style={{ width: "18rem" }}>
          <Card.Header>Transaction ID: {transactionId}</Card.Header>
          <Card.Body>
            <Card.Title>Name: {transaction.transaction_name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Date: {new Date(transaction.date).toLocaleDateString()}
            </Card.Subtitle>
            <Card.Text>
              Details: {transaction.transaction_details}
              <br />
              Amount: {transaction.amount}
              <br />
              Type: {transaction.type}
            </Card.Text>
            <ButtonGroup className="d-flex justify-content-center">
              <Button variant="outline-primary" size="sm" onClick={goBack}>
                Back{" "}
              </Button>
              <Button
                className="mx-2"
                variant="outline-primary"
                size="sm"
                onClick={updateTransactionHandler}
              >
                Edit Transaction{" "}
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={deleteSelectedHandler}
              >
                {loading ? (
                  <Spinner
                    className="me-2"
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Delete"
                )}
              </Button>
            </ButtonGroup>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
