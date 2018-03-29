import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import axios from 'axios';
import { MuiThemeProvider } from 'material-ui/styles';

export default class SimpleSlider extends React.Component {
    state = {
        products: []
    }
    componentDidMount() {
        axios.get(`http://localhost:65324/api/Product/GetAllProducts`)
            .then(res => {
                const products = res.data;
                this.setState({ products });
            })
    }
    render() {
        const collumns =  window.innerWidth <= 500 ? 2 : 4;

        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
            },
            gridList: {
                margin: 'auto',
                overflowY: 'auto',
            },
            subtitleStyle:{
                fontWeight: 'bold'
            }
        };
        
        return (
            <div>
                <MuiThemeProvider>
                    <div style={styles.root}>
                        <GridList
                            cols={collumns}
                            cellHeight={200}
                            padding={6}
                            style={styles.gridList}
                        >
                            {this.state.products.map((product) => (
                                <GridTile
                                    key={product.id}
                                    title={product.name}
                                    subtitle={product.price + " €"}
                                    subtitleStyle = {styles.subtitleStyle}
                                    actionPosition="left"
                                    titlePosition="bottom"
                                    cols={product.featured ? 2 : 1}
                                    rows={product.featured ? 2 : 1}
                                >
                                <img key={product.id} alt="" src={(product.image)} />
                                </GridTile>
                            ))}
                        </GridList>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}
