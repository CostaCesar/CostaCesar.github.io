const blockSize = 6;

const canvasWidth  = Math.round(screen.width / blockSize);
const canvasHeight = Math.round(screen.height / blockSize);

// const orientation = window.innerWidth > window.innerHeight; // True: Landscape | False: Portrait
class Fire
{
    constructor()
    {
        this.width = canvasWidth; 
        this.height = canvasHeight;
        this.baseValue = 36;
        this.decay = 2;
        this.baseModf = 1;
        this.windModf = 2;
        this.windMax = 6;
        this.windMin = 2;
        this.palete = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }]

        this.update_FireId = 0;
        this.update_WindId;
        this.screenData;
        this.context; 
        this.frameBuffer;

        let canvas = document.getElementById("fire");
        this.context = canvas.getContext("2d");
        this.frameBuffer = this.context.createImageData(this.width, this.height);
        
        this.screenData = Array(this.width * this.height).fill(0);
        
        canvas.width = this.width;
        canvas.height = this.height;

        this.context.fillStyle = "rgba(0,0,0,255)";
        this.context.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    update_Wind(local)
    {
        let random = Math.floor(Math.random() * local.windMax - local.windMin);
        if(random % 2 == 1)
            local.windModf = Math.max(local.windModf+1, local.windMax);
        else local.windModf = Math.max(local.windModf-1, local.windMin);
    }
    
    writePixel(local, index)
    {
        let screen_Index = index * 4;
        let fire_value = local.screenData[index];
        local.frameBuffer.data[screen_Index+0] = local.palete[fire_value].r;
        local.frameBuffer.data[screen_Index+1] = local.palete[fire_value].g;
        local.frameBuffer.data[screen_Index+2] = local.palete[fire_value].b;
        local.frameBuffer.data[screen_Index+3] = 255;
    }
    
    update_Fire(local)
    {
        let limit = (local.height * local.width) - local.width;
        let random = 1;
        
        for (let index = 0; index < local.screenData.length; index++)
        {
            if (index >= limit)
            {
                random = Math.floor(Math.random() * local.baseModf);
                local.screenData[index] = local.baseValue - random;
            }
            else
            {
                random = Math.floor(Math.random() * local.decay);
                let wind = Math.floor(Math.random() * 10) % local.windModf;
                let value = local.screenData[index + local.width];
                local.screenData[index - wind] = value - random >= 0 ? value - random : 0;
            }
            local.writePixel(local, index);
        }
        local.context.putImageData(local.frameBuffer, 0, 0)
    }

    start()
    {
        if(this.update_FireId != 0) return;
        console.log("Fire started");
        
        let canvas = document.getElementById("fire");
        this.context = canvas.getContext("2d");
        
        this.update_FireId = setInterval(this.update_Fire, 35, this);
        this.update_WindId = setInterval(this.update_Wind, 1000, this);
    }
    stop()
    {
        clearInterval(this.update_FireId);
        clearInterval(this.update_WindId);
        this.update_FireId = 0;
    }
}

class Rain
{
    constructor()
    {
        this.width = canvasWidth; 
        this.height = canvasHeight;
        this.baseValue = 36;
        this.decay = 2;
        this.baseChance = 5;

        this.updateId = 0;
        this.generatorId;
        this.screenData;
        this.context; 
        this.frameBuffer;
        this.palete = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }]
    
        let canvas = document.getElementById("rain");
        this.context = canvas.getContext("2d");
        this.frameBuffer = this.context.createImageData(this.width, this.height);
        
        this.screenData = Array(this.width * this.height).fill(0);
        
        canvas.width = this.width;
        canvas.height = this.height;

        this.context.fillStyle = "rgba(0,0,0,255)";
        this.context.fillRect(0, 0, canvas.width, canvas.height);
    }

    writePixel(local, index)
    {
        let screen_index = index * 4;
        local.frameBuffer.data[screen_index+0] = local.palete[local.screenData[index]].r;
        local.frameBuffer.data[screen_index+1] = local.palete[local.screenData[index]].g;
        local.frameBuffer.data[screen_index+2] = local.palete[local.screenData[index]].b;
        local.frameBuffer.data[screen_index+3] = 255;
    }

    genSources(local)
    {
        for (let index = 0; index < local.width; index++)
        {
            let random = Math.random();

                random = Math.floor(random * 100);
                if(random < local.baseChance)
                {
                    random = Math.floor(Math.random() * 36);
                    local.screenData[index] = random;
                }
            local.writePixel(local, index);
        }
    }

    update(local)
    {
        for (let index = local.screenData.length - 1; index >= 0; index--)
        {
            let random = Math.floor(Math.random() * 5);
            
            if(local.screenData[index] != 0 || index < local.width)
            {
                local.screenData[index] = Math.max(local.screenData[index] - random, 0);
            }
            else
            {
                let value = local.screenData[index - local.width];
                local.screenData[index] = value;
            }
            local.writePixel(local, index);
        }
        local.context.putImageData(local.frameBuffer, 0, 0);
    }

    start()
    {
        if(this.updateId != 0) return
        console.log("Rain started");
        
        let canvas = document.getElementById("rain");
        this.context = canvas.getContext("2d");
        
        this.generatorId = setInterval(this.genSources, 500, this);
        this.updateId = setInterval(this.update, 50, this);
    }

    stop()
    {
        clearInterval(this.updateId);
        clearInterval(this.generatorId);
        this.updateId = 0;
    }
}