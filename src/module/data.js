export let vTypeList =  [
    {
        label: '游戏',
        id: 0
    },
    {
        label: '烹饪',
        id: 1
    },
    {
        label: '手工',
        id: 2
    },
    {
        label: '舞蹈',
        id: 3
    },
    {
        label: '歌曲',
        id: 4
    },
    {
        label: '脱口秀',
        id: 5
    },
    {
        label: '科学实验',
        id: 6
    }
]
export let vStyleList =  [
    {
        label: '严肃',
        id: 0
    },
    {
        label: '轻松',
        id: 1
    },
    {
        label: '搞笑',
        id: 2
    },
    {
        label: '诡异',
        id: 3
    },
    {
        label: '煽情',
        id: 4
    },
    {
        label: '舒服',
        id: 5
    },
    {
        label: '恶心',
        id: 6
    }
]
export let vQualityList = [
    {
        label: '优良',
        id: 0,
        costPower: 1,
        finishStatus: 0.5
    },
    {
        label: '一般',
        id: 1,
        costPower: 1,
        finishStatus: 1
    },
    {
        label: '粗糙',
        id: 2,
        costPower: 0.5,
        finishStatus: 1
    }
]
export let gRan = function (mean, stdev) {
    var y2;
    var use_last = false;
    return function() {
        var y1;
        if(use_last) {
           y1 = y2;
           use_last = false;
        }
        else {
            var x1, x2, w;
            do {
                 x1 = 2.0 * Math.random() - 1.0;
                 x2 = 2.0 * Math.random() - 1.0;
                 w  = x1 * x1 + x2 * x2;               
            } while( w >= 1.0);
            w = Math.sqrt((-2.0 * Math.log(w))/w);
            y1 = x1 * w;
            y2 = x2 * w;
            use_last = true;
       }

       var retval = mean + stdev * y1;
       if(retval > 0) 
           return retval;
       return -retval;
   }
}
