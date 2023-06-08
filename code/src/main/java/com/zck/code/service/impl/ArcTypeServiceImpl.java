package com.zck.code.service.impl;


import com.zck.code.entity.ArcType;
import com.zck.code.repository.ArcTypeRepository;
import com.zck.code.run.StartupRunner;
import com.zck.code.service.ArcTypeService;
import com.zck.code.util.Consts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 资源类型service实现类
 */
@Service("arcTypeService")
public class ArcTypeServiceImpl implements ArcTypeService {
    @Autowired
    private ArcTypeRepository arcTypeRepository;

    @Autowired
    private RedisTemplate<Object, Object> redisTemplate;

    @Autowired
    private StartupRunner startupRunner;

    @Override
    public List<ArcType> list(Integer page, Integer pageSize, Sort.Direction direction, String... properties) {
        Page<ArcType> arcTypePage = arcTypeRepository.findAll(PageRequest.of(page - 1, pageSize, direction, properties));
        return arcTypePage.getContent();
    }

    @Override
    public List listAll(Sort.Direction direction, String... properties) {
        if (redisTemplate.hasKey(Consts.ALL_ARC_TYPE_NAME)) {
            return redisTemplate.opsForList().range(Consts.ALL_ARC_TYPE_NAME, 0, -1);
        } else {
            List list = arcTypeRepository.findAll(Sort.by(direction, properties));
            if (list != null && list.size() > 0) {
                for (int i = 0; i < list.size(); i++) {
                    redisTemplate.opsForList().rightPush(Consts.ALL_ARC_TYPE_NAME, list.get(i));
                }
            }
            return list;
        }
    }

    @Override
    public Long getCount() {
        return arcTypeRepository.count();
    }

    @Override
    public void save(ArcType arcType) {
        boolean flag = false;
        if (arcType.getArcTypeId() == null) {
            flag = true;
        }
        arcTypeRepository.save(arcType);
        if (flag) {               //新增类型
            redisTemplate.opsForList().rightPush(Consts.ALL_ARC_TYPE_NAME, arcType);
        } else {                  //修改类型
            redisTemplate.delete(Consts.ALL_ARC_TYPE_NAME);
        }
        startupRunner.loadData();
    }

    @Override
    public void delete(Integer id) {
        arcTypeRepository.deleteById(id);
    }

    @Override
    public ArcType getById(Integer id) {
        return arcTypeRepository.getOne(id);
    }
}
