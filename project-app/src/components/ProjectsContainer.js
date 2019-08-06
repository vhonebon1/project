import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'

class ProjectsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      inputValue: ''
    }
	}

  getProjects() {
    axios.get('/api/v1/projects')
    .then(response => {
      console.log(response)
      this.setState({projects: response.data})
    })
    .catch(error => console.log(error))
  }

  createProject = (e) => {
    if (e.key === 'Enter' && !(e.target.value === '')) {
      axios.post('/api/v1/projects', {project: {title: e.target.value}})
      .then(response => {
        const projects = update(this.state.projects, {
          $splice: [[0, 0, response.data]]
        })
        this.setState({
          projects: projects,
          inputValue: ''
        })
      })
      .catch(error => console.log(error))
    }
  }

  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  }

  updateProject = (e, id) => {
    axios.put(`/api/v1/projects/${id}`, {project: {done: e.target.checked}})
    .then(response => {
      const projectIndex = this.state.projects.findIndex(x => x.id === response.data.id)
      const projects = update(this.state.projects, {
        [projectIndex]: {$set: response.data}
      })
      this.setState({
        projects: projects
      })
    })
    .catch(error => console.log(error))
  }

  deleteProject = (id) => {
    axios.delete(`/api/v1/projects/${id}`)
    .then(response => {
      const projectIndex = this.state.projects.findIndex(x => x.id === id)
      const projects = update(this.state.projects, {
        $splice: [[projectIndex, 1]]
      })
      this.setState({
        projects: projects
      })
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getProjects()
	}

  render() {
    return (
      <div>
        <div className="inputContainer">
          <input className="taskInput" type="text"
            placeholder="Add a task" maxLength="50"
            onKeyPress={this.createProject}
            value={this.state.inputValue} onChange={this.handleChange} />
        </div>
        <div className="listWrapper">
          <ul className="taskList">
            {this.state.projects.map((project) => {
              return(
                <li className="task" key={project.id}>
                  <input className="taskCheckbox" type="checkbox"
                    checked={project.done}
                    onChange={(e) => this.updateProject(e, project.id)} />
                  <label className="taskLabel">{project.title}</label>
                  <span className="deleteTaskBtn"
                    onClick={(e) => this.deleteProject(project.id)}>
                    x
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default ProjectsContainer
