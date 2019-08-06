class ProjectsController < ApplicationController
  def index
    projects = Project.order("created_at DESC")
    render json: projects
  end

  def create
    project = Project.create(project_param)
    render json: project
  end

  def update
    project = Project.find(params[:id])
    project.update_attributes(project_param)
    render json: project
  end

  def destroy
    project = Project.find(params[:id])
    project.destroy
    head :no_content, status: :ok
  end

  private
    def project_param
      params.require(:project).permit(:title, :done)
    end
end
