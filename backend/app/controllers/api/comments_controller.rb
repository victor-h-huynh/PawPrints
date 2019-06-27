class Api::CommentsController < ApplicationController
    def index
        comments = Comment.all
        render :json => comments, :include=> [:user, :pet]
      end

    # def create
    #     @pet = Pet.find(params[:id])
    #     @comment = Comment.create!(
    #         user: params['name']
    #         comment: params['comment']        

    #     )
    #     if @comment.save
    #         render :json => comments
    #     end

    def destroy
        @comment = Comment.find(params[:id])
        @comment.destroy
    end
end