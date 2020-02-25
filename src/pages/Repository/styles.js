import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #8a8d91;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #565857;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
  span {
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #8a8d91;
  list-style: none;

  li {
    display: flex;
    padding: 14px 10px;
    border: 1px solid #8a8d91;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #734b5e;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #734b5e;
          &:hover {
            color: #8a8d91;
          }
        }

        span {
          background: #734b5e;
          color: #fff;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #8a8d91;
      }
    }
  }
`;

export const Pages = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;

  button {
    justify-content: center;
    align-items: center;
    width: 80px;
    border: 1px solid #734b5e;
    color: #fff;
    background: #8a8d91;
    border-radius: 4px;
    font-size: 14px;

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }
`;

export const State = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;

  button {
    justify-content: center;
    align-items: center;
    color: #fff;
    width: 70px;
    margin-left: 5px;
    border: 1px solid #8a8d91;
    padding: 2px 5px;
    border-radius: 4px;
    font-size: 14px;
  }

  .all {
    background: #734b5e;
  }
  .open {
    background: red;
  }
  .closed {
    background: green;
  }
`;
