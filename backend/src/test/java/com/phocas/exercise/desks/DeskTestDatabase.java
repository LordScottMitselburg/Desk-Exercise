package com.phocas.exercise.desks;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import com.fleetpin.graphql.database.manager.test.annotations.TestDatabase;

@Retention(RetentionPolicy.RUNTIME)
@TestDatabase(objectMapper = ObjectMapperCreator.class, classPath = "com.phocas.exercise.desks.schema")
public @interface DeskTestDatabase {}
