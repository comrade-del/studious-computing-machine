class FormsController < ApplicationController
    #before_action :logged_in_user, only: [:create, :destroy]
    #before_action :correct_user, only: [:destroy]
  
    def new
      @form = Form.new
    end
  
    def create
        #puts current_user.inspect
        @form = Form.new(form_params)
        if @form.save
            flash[:success] = "Form submitted!"
            redirect_to root_url
        else
            puts @form.errors.full_messages
            render 'new', status: :unprocessable_entity
        end
    end

    # app/controllers/forms_controller.rb
    def visualization
      # Retrieve the form data from the database or any other source
      @gender_data = Form.pluck(:gender) # Replace with your actual logic to fetch the form data
      @income_data = Form.pluck(:income_level) # New income data
    
      respond_to do |format|
        format.html { render 'visualization' } # Render the visualization.html.erb view
        format.json { render json: { gender_data: @gender_data, income_data: @income_data } } # Respond with form data as JSON if needed
      end
    end
    
    
    
  
    def destroy
      @form = current_user.form.find_by(id: params[:id])
      @form.destroy if @form
      flash[:success] = "Form deleted!"
      redirect_to root_url
    end
  
    private
  
    def form_params
      params.require(:form).permit(:id_number, :name, :gender, :phone_number, :address, :city, :state, :house_size, :relationship, :marital_status, :religion, :education, :employment, :income_level)
    end
  
    #def correct_user
     # return unless action_name.in?(%w[destroy])
      #@form = current_user.form.find_by(id: params[:id])
      #redirect_to(root_url, status: :see_other) if @form.nil?
    #end
  end
  