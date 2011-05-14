require 'sinatra/base'

module ZapposChallenge
  class Server < Sinatra::Base
    get '/' do
      haml :index
    end
  end
end