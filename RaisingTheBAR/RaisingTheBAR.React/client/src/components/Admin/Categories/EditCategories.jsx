import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CategoryTable from './CategoryTable';
import CreatingCategoryForm from './CreatingCategoryForm';
import EditCategoryProducts from './EditCategoryProducts'
import ErrorMessage from '../../User/ErrorMessage';

export default class EditCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      categories: [],
      responseError: ''
    }
  }
  componentDidMount() {
    this.getCategories()
  }
  getCategories() {
    var uri = '/api/Category/GetAllCategories';
    axios.get(uri
    ).then(res => {
      const categories = res.data;
      this.setState({ categories: categories });
    }
    ).catch(error => {
      console.log("error with getting all categories!")
      this.setState({ responseError: error.response.request.statusText });
    });
  }
  postNewCategory = (name, parentId) => {
    var createUri = '/api/Category/CreateCategory';
    axios.post(createUri, {
      name: name,
      parentCategoryId: parentId,
    }).catch(error => {
      console.log("error with creating new category!")
      this.setState({ responseError: error.response.data });
    });
    this.refresh();
  }
  handleTabChange = (event, value) => {
    this.setState({ tabValue: value });
  };
  refresh = () => {
    this.sleep(500).then(() => {
      this.getCategories()
    })
  }
  sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  render() {
    return (
      <div>
        <ErrorMessage responseError={this.state.responseError} />
        <Tabs selectedIndex={this.state.tabIndex} onSelect={current => this.setState({ tabIndex: current })}>
          <TabList >
            <Tab >Category list</Tab>
            <Tab >Create category</Tab>
            <Tab >Edit category products</Tab>
          </TabList>
          <TabPanel>
            <CategoryTable refresh={this.refresh.bind(this)} categories={this.state.categories} />
          </TabPanel>
          <TabPanel>
            <CreatingCategoryForm categories={this.state.categories} onAddCategoryEvent={this.postNewCategory.bind(this)} />
          </TabPanel>
          <TabPanel>
            <EditCategoryProducts refresh={this.refresh.bind(this)} categories={this.state.categories} />
          </TabPanel>
        </Tabs>



      </div>
    )
  }
}