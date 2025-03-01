package com.phocas.exercise.desks;

import com.fleetpin.graphql.builder.annotations.Context;
import com.fleetpin.graphql.database.manager.VirtualDatabase;

@Context
public record ApiContext(VirtualDatabase database) {}
