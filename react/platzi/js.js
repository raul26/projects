var items = [
  {value: 'item 1', id: 1}, {value: 'item 2', id: 2}, {value: 'item 3', id: 3}
];
class TodoListWrapper extends React.Component{
  constructor(props){
    super(props);
    this.state = {items:[]};
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
  }
  componentDidMount(){
    this.setState({items: items});
  }
  handleSubmit2(item){
    //this.setState({items: items.push(item)});
    let newItem = items.concat([item])
    this.setState({items: newItem});
  }
  render(){
    return (
      <div>
      <List items={this.state.items}/>
      <p>Total: {this.state.items.length}</p>
      <AddItem onCommentSubmit={this.handleSubmit2}/>
      </div>
    );
  }
}
class AddItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {item:''};
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange(e){
    this.setState({item: e.target.value})
    console.log(this.state.item)
  }
  handleSubmit(e){
    e.preventDefault();
    let item = this.state.item, id = Date.now();
    this.props.onCommentSubmit({value: item, id:id});
    this.setState({item:''});
  }
  render(){
    return(
      <div>
      <form onSubmit={this.handleSubmit}>
      <input type="text" name="text" onChange={this.onChange} value={this.state.item}/>
      <input type="submit" value="Add Item"/>
      </form>
      </div>
    );
  }
}
class Item extends React.Component{
  render(){
    return(
      <li>{this.props.item.value}</li>
    );
  }
}
class List extends React.Component{
  render(){
    var list = [];
    this.props.items.forEach((item) =>{
      list.push(<Item key={item.id} item={item}/>);
    })
    return(
      <div>
      <h1>Todo List</h1>
      <ul>{list}</ul>
      </div>
    )
  }
}
ReactDOM.render(<TodoListWrapper items={items}/>, document.getElementById('container'));
