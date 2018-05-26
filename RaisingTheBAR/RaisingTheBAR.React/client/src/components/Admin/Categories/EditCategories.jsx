import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CategoryTable from './CategoryTable';
import CreatingCategoryForm from './CreatingCategoryForm';

export default class EditCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      categories: [],
    }
  }
  componentDidMount() {
    this.getData()
  }
  getData() {
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
  handleTabChange = (event, value) => {
    this.setState({ tabValue: value });
  };
  handleAddEvent() {

    // var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);

    // var newCategory = {
    //   id: id,
    //   name: event.target.value,
    //   children: [],
    //   productAmount: 0,
    //   isAdded : true
    // }
    // console.log(this.state.categories)
    // this.state.categories.push(category);
    // this.setState({categories: this.state.categories});
  }
  render() {
    return (
      <div>
        <Tabs selectedIndex={this.state.tabIndex} onSelect={current => this.setState({ tabIndex: current })}>
          <TabList >
            <Tab >Category list</Tab>
            <Tab >Create category</Tab>
            {/* <Tab >Category products</Tab> */}
          </TabList>
          <TabPanel>
            <CategoryTable categories={this.state.categories} />
          </TabPanel>
          <TabPanel>
            <CreatingCategoryForm categories={this.state.categories} onAddEvent={this.handleAddEvent.bind(this)}/>
          </TabPanel>
          {/* <TabPanel>
            <CategoryProducts categories={this.state.categories} />
          </TabPanel> */}
        </Tabs>



      </div>
    )
  }
}