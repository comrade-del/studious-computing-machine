class FormController < ApplicationController
    #before_action :logged_in_user, only: [:create, :destroy]

    def new
        @form = Form.new
    end

    def create
        puts form_params.inspect
        @form =Form.new(form_params)
        if @form.save
            flash[:success] = "Form submitted!"
            redirect_to root_url
        else
            render 'static_pages/home'
        end
    end

    def destroy
    end

    private

    def form_params
        params.require(:form).permit(:id_number, :name, :gender, :phone_number, :address, :city, :state, :house_size, :relationship, :marital_status, :religion, :education, :employment, :income_level)
    end
      
      
end
