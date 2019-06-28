class Api::CommentsController < ApplicationController
    def index
        comments = Comment.all
        render :json => comments, :include=> [:user, :pet]
      end

    def create
        pet = Pet.find_by id: params['pet_id']
        user = User.find_by id: params['user_id']
        puts pet.inspect
        puts user.inspect
        @comment = Comment.create!(
            comment: params['txt'],        
            pet_id: pet.id,
            user_id: user.id
        )
        if @comment.save
            render :json => @comment.to_json(include: :user)
        else 
            render :new
        end
    end

    def destroy
        @comment = Comment.find(params[:id])
        @comment.destroy
    end
end