CREATE TABLE "articulos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "articulos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre_articulo" varchar(50) NOT NULL,
	"fecha_registro" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"fecha_cierre" timestamp,
	"total_dias" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "estaciones_servicio" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "estaciones_servicio_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text NOT NULL,
	"ubicacion" text NOT NULL,
	"fecha_creacion" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"fecha_modificacion" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"fecha_eliminado" timestamp
);
--> statement-breakpoint
CREATE TABLE "registros_gasolina" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "registros_gasolina_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"id_estacion_servicio" integer NOT NULL,
	"id_tipo_vehiculo" integer NOT NULL,
	"kilometraje_actual" integer NOT NULL,
	"litros_cargados" numeric(10, 2) NOT NULL,
	"monto_cargado" numeric(10, 2) NOT NULL,
	"precio_por_litro" numeric(10, 2) NOT NULL,
	"fecha_carga" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tipos_vehiculo" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tipos_vehiculo_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text NOT NULL,
	"fecha_creacion" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"fecha_modificacion" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"fecha_eliminado" timestamp
);
--> statement-breakpoint
ALTER TABLE "registros_gasolina" ADD CONSTRAINT "registros_gasolina_id_estacion_servicio_estaciones_servicio_id_fk" FOREIGN KEY ("id_estacion_servicio") REFERENCES "public"."estaciones_servicio"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "registros_gasolina" ADD CONSTRAINT "registros_gasolina_id_tipo_vehiculo_tipos_vehiculo_id_fk" FOREIGN KEY ("id_tipo_vehiculo") REFERENCES "public"."tipos_vehiculo"("id") ON DELETE no action ON UPDATE no action;