-- Audit trigger function

CREATE OR REPLACE FUNCTION audit_product_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN

    IF TG_OP = 'INSERT' THEN

        INSERT INTO audit_logs (
            table_name,
            record_id,
            operation,
            old_data,
            new_data,
            changed_by
        )
        VALUES (
            TG_TABLE_NAME,
            NEW.id,
            'INSERT',
            NULL,
            to_jsonb(NEW),
            CURRENT_USER
        );

        RETURN NEW;

    ELSIF TG_OP = 'UPDATE' THEN

        INSERT INTO audit_logs (
            table_name,
            record_id,
            operation,
            old_data,
            new_data,
            changed_by
        )
        VALUES (
            TG_TABLE_NAME,
            NEW.id,
            'UPDATE',
            to_jsonb(OLD),
            to_jsonb(NEW),
            CURRENT_USER
        );

        RETURN NEW;

    ELSIF TG_OP = 'DELETE' THEN

        INSERT INTO audit_logs (
            table_name,
            record_id,
            operation,
            old_data,
            new_data,
            changed_by
        )
        VALUES (
            TG_TABLE_NAME,
            OLD.id,
            'DELETE',
            to_jsonb(OLD),
            NULL,
            CURRENT_USER
        );

        RETURN OLD;

    END IF;

    RETURN NULL;

END;
$$;

-- Create audit trigger
CREATE TRIGGER trg_products_audit
AFTER INSERT OR UPDATE OR DELETE
ON products
FOR EACH ROW
EXECUTE FUNCTION audit_product_changes();