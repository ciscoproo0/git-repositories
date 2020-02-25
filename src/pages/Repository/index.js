/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/container/index';
import { Loading, Owner, IssueList, State, Pages } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issue: [],
    loading: true,
    page: 1,
    state: ['all', 'open', 'closed'],
    selectedState: '',
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'all',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  listIssues = async () => {
    const { match } = this.props;

    const { page, selectedState } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          ...(selectedState !== ''
            ? { state: selectedState }
            : { state: 'all' }),
          per_page: 5,
          ...(page > 1 ? { page } : {}),
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  };

  handleClickPages = async e => {
    const { page } = this.state;

    const buttonPage = e.target.value;

    await this.setState({
      ...(buttonPage === 'next'
        ? { page: page + 1 }
        : buttonPage === 'previous'
        ? { page: page - 1 }
        : {}),
    });
    this.listIssues();
  };

  handleClickState = async e => {
    const { state, selectedState } = this.state;

    const select = state.filter(s => s === e.target.value);
    await this.setState({
      page: 1,
      ...(select !== '' ? { selectedState: String(select) } : selectedState),
    });
    this.listIssues();
  };

  render() {
    const { repository, issues, loading, page } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
          <State onClick={this.handleClickState}>
            <button type="submit" className="open" value="open">
              Open
            </button>
            <button type="submit" className="closed" value="closed">
              Closed
            </button>
            <button type="submit" className="all" value="all">
              All
            </button>
          </State>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <Pages onClick={this.handleClickPages} page={page}>
          <button
            className="previous"
            type="button"
            value="previous"
            disabled={page < 2}
          >
            Previous
          </button>
          <button className="next" type="button" value="next">
            Next
          </button>
        </Pages>
      </Container>
    );
  }
}
