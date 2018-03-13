import React from 'react';
import Tabs from 'material-ui/Tabs'
import Paper from 'material-ui/Paper';
import MenuTab from './MenuTab';
import Select from 'material-ui/Select';
import menuItems from '../menuItems';
import MenuItem from './MenuItem';

export default class Menu extends React.Component{
    state = {
        selectedIndex: 0
    }

    onSelectedChange =  (e, selectedIndex) => {
        this.setState({
            selectedIndex
        });
    }
    
    render() {
        const { selectedIndex } = this.state;
        const items = menuItems(this.props.node);

        return (
            <Paper className="editpage__menu">
                <Tabs
                    value={selectedIndex}
                    onChange={this.onSelectedChange}>
                    {
                        items.map(({icon, text}, i) => <MenuTab key={i} icon={icon} text={text} value={i}/>)
                    } 
                </Tabs>
                <div className='editpage__inlineMenuItems' >
                {
                    items[selectedIndex].components.map(({icon, text, component}, i) => <MenuItem icon={icon}
                                                                                                    text={text}
                                                                                                    input={component}
                                                                                                    key={i} 
                                                                                        />)
                }
                </div>
            </Paper>
        )
    }
}