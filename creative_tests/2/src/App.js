import React, { Component } from 'react';
import Table from './table/table';
import TableSearch from './TableSearch/TableSearch';
import _ from 'lodash';


class App extends Component {
  state ={
    isLoading: true, // для отображения загрузки (в перспективе можно сделать симпотичный Loader)
    data: [],
    search: '',
    sort: 'asc',  //'desc'
    sortField: 'id',   // сортировка по умолчанию
  }

  searchHandler = search =>(
      this.setState({search})
  )

  async componentDidMount() {

    let data = [
      {id: 1, name: 'Вася', date:'15.06.2018', count: 11},
      {id: 2, name: 'Петя', date:'23.11.2018', count: 23},
      {id: 3, name: 'Иван', date:'12 марта 2017', count: 3},
      {id: 4, name: 'Александр', date: '20/12/2010', count: 1},
      {id: 5, name: 'Евгений', date:'12.09.2018', count: 112},
      {id: 6, name: 'Мария', date:'1.08.2016', count: 122},
      {id: 7, name: 'Анастасия', date:'20.11.2018', count: 34},
      {id: 8, name: 'Степан', date:'12.11.2019', count: 10}
    ];

    // преобразуем дату в строку формата yyyy/mm/dd чтобы нормально работала сортировка в таблице
    data.forEach(function(item, i, data) {
      if (/[а-яА-ЯЁё]+/.test(item.date)){
        let monthname = item.date.match(/[а-яА-ЯЁё]+/)[0]  // вернет месяц буквами
        let monthNumber = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'нобря', 'декабря'].indexOf(monthname.toLowerCase()) + 1;
        if (monthNumber!==0) {  // в буквенной комбинации есть название месяца
          item.date = item.date.replace(monthname, monthNumber)
        }
      }
      item.date = item.date.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1')
    });

    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    })
  }

  onSort = sortField => {
    const cloneData = this.state.data.concat();
    const sortType = this.state.sort === 'asc' ? 'desc' : 'asc';  // меняем сортировку на противоволожную при нажатии
    const orderedData = _.orderBy(cloneData, sortField, sortType);

    this.setState({
      data: orderedData,
      sort: sortType,
      sortField
    })

  }

  getFilteredData(){
    const {data, search} = this.state

    if (!search) {
      return data
    }
    var result = data.filter(item => {
      return (
          item["id"].toString().includes(search.toString()) ||
          item["name"].toLowerCase().includes(search.toLowerCase()) ||
          item["date"].toString().includes(search.toString()) ||
          item["count"].toString().includes(search.toString())
      );
    });

    if(!result.length){
      result = this.state.data
    }
    return result
  }

  render() {
    const filteredData = this.getFilteredData();
    return (
        <div className="container">
          {
          this.state.isLoading
            ? <h3>Загрузка</h3>//<Loader />
            : <React.Fragment>
              <TableSearch onSearch={this.searchHandler} />
              <Table
                data={filteredData}
                onSort={this.onSort}
                // параметры sort и sortField передаются в стейт App для визуального отображения направления сортировки
                sort={this.state.sort}
                sortField={this.state.sortField}
              />
              </React.Fragment>
          }
        </div>
    );
  }
}

export default App;