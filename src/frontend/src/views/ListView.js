import React from 'react'
import { Link } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import queryString from 'query-string'

import Flexbox from 'flexbox-react';

export const query = gql`
query ListViewSearch($search: String, $endCursor: String) {
  allMessages(first: 2, message_Icontains: $search, after: $endCursor) {
    edges {
      node {
        id, message
      }
    },
    pageInfo {
      hasNextPage,
      hasPreviousPage,
      startCursor,
      endCursor
    }
  }
}
`

class ListView extends React.Component {
  handleSearchSubmit(e) {
    e.preventDefault()
    let data = new FormData(this.form)
    let query = `?search=${data.get('search')}`
    this.props.history.push(`/${query}`)
  }

  loadMore() {
    let { data, location } = this.props
    data.fetchMore({
      query: query,
      variables: {
        search: queryString.parse(location.search).search,
        endCursor: data.allMessages.pageInfo.endCursor,
      },
      updateQuery: (prev, next) => {
        const newEdges = next.fetchMoreResult.allMessages.edges
        const pageInfo = next.fetchMoreResult.allMessages.pageInfo
        return {
          allMessages: {
            edges: [...prev.allMessages.edges, ...newEdges],
            pageInfo,
          },
        }
      },
    })
  }

  render() {
    let { data } = this.props
    if (data.loading || !data.allMessages) {
      return <div>Loading...</div>
    }
    return (
      <div className="Catego">

       
        <div className="searchy">
        <form className="search"
          ref={ref => (this.form = ref)}
          onSubmit={e => this.handleSearchSubmit(e)}
        >
          <input type="text" name="search" placeholder="Search"/>
          {/*<button type="submit">Search</button>*/}
        </form>
        </div>
         <h2>Categories</h2>
        {data.allMessages.edges.map(item => (
          <p key={item.node.id}>
            <Link to={`/messages/${item.node.id}/`}>
              {item.node.message}
            </Link>
          </p>
        ))}
        {data.allMessages.pageInfo.hasNextPage &&
          <button onClick={() => this.loadMore()}>Load more...</button>}
        <div class="page-body">
  <div class="row">
    <div class="col-lg-12">
      <Flexbox flexDirection="row" minHeight="50vh">
        <Flexbox flexGrow={1} className="flex-child"> 
          <a href=""><img src="img/article1.jpg" alt=""></img></a>
          <h3><a href="">Article Title</a></h3>
        </Flexbox>
        <Flexbox  flexGrow={1} className="flex-child">
          <a href=""><img src="img/article1.jpg"  alt=""></img></a>
          <h3><a href="">Article Title</a></h3>
        </Flexbox>
        <Flexbox  flexGrow={1} className="flex-child">
          <a href=""><img src="img/article1.jpg"  alt=""></img></a>
          <h3><a href="">Article Title</a></h3>
        </Flexbox>
        <Flexbox  flexGrow={1} className="flex-child">
          <a href=""><img src="img/article1.jpg"  alt=""></img></a>
          <h3><a href="">Article Title</a></h3>
        </Flexbox>
      </Flexbox>
      </div>
  </div>
  <div class="row">
    {/*<div class="col-lg-12">*/}
      <div class="flex-parent">
        <Flexbox flexDirection="row" minHeight="100vh">
        <Flexbox flexGrow={1} className="flex-child"> 
          <a href=""><img src="img/article1.jpg" alt=""></img></a>
          <h3><a href="">Article Title</a></h3>
        </Flexbox>
        <Flexbox  flexGrow={1} className="flex-child">
          <a href=""><img src="img/article1.jpg"  alt=""></img></a>
          <h3><a href="">Article Title</a></h3>
        </Flexbox>
        <Flexbox  flexGrow={1} className="flex-child">
          <a href=""><img src="img/article1.jpg"  alt=""></img></a>
           <h3><a href="">Article Title</a></h3>
        </Flexbox>
        <Flexbox  flexGrow={1} className="flex-child">
          <a href=""><img src="img/article1.jpg"  alt=""></img></a>
          <h3><a href="">Article Title</a></h3>
        </Flexbox>
      </Flexbox>
        
      </div>
    {/*</div>*/}
  </div>
  
  
      </div>
  </div>
    )
  }
}

const queryOptions = {
  options: props => ({
    variables: {
      search: queryString.parse(props.location.search).search,
      endCursor: null,
    },
  }),
}

ListView = graphql(query, queryOptions)(ListView)
export default ListView
