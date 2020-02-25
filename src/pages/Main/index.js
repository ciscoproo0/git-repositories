/* eslint-disable no-throw-literal */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/container/index';
import { Form, SubmitButton, List, ErrorDiv } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    apiError: false,
    errorMessage: '',
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({
        repositories: JSON.parse(repositories),
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { newRepo, repositories } = this.state;

      if (newRepo === '') throw 'Preencha o campo com usuário/repositório';

      if (repositories.find(repository => repository.name === newRepo))
        throw 'Este repositório já está cadastrado';

      const response = await api.get(`/repos/${newRepo}`);

      if (response) {
        const data = {
          name: response.data.full_name,
        };

        this.setState({
          repositories: [...repositories, data],
          newRepo: '',
          loading: false,
          apiError: false,
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        apiError: true,
        errorMessage: `Repositório inválido`,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  handleInputChange = e => {
    this.setState({
      newRepo: e.target.value,
    });
  };

  render() {
    const {
      newRepo,
      loading,
      repositories,
      apiError,
      errorMessage,
    } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={apiError}>
          <input
            type="text"
            placeholder="Adicionar NomeDoUsuário/Repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <ErrorDiv error={apiError}>{errorMessage}</ErrorDiv>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
