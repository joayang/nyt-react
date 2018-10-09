import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
// import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";

class Saved extends Component {
  state = {
    articles: [],
    searchResults: [],
    topic: "",
    startYear: "",
    endYear: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  //Load saved articles from mongodb
  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "", url: "", date: "" })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    console.log(id);
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  saveArticle = data => {
    console.log(data);
    API.saveArticle(data)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log("name value",event.target );
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic) {
      console.log("the value of title", this.state.topic);
      API.searchArticles(this.state.topic, this.state.startYear, this.state.endYear)
        .then(res =>
          {
            this.setState({ searchResults: res.data.response.docs, title: "", startYear: "", endYear: "" });
            console.log(res.data.response.docs);
          }
        )
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          
        <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <a href={article.url} target="_blank">
                      <strong>
                        {article.title} <br /> {article.url} <br /> {article.date}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;