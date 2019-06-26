class Api::DescriptionsController < ApplicationController
    # before_action :authorize_request, except: :create
    def index
        descriptions = Description.all
        render json: descriptions
    end
end
